"use client"

import {useEffect, useRef, useState} from "react"
import {MiyaWalking} from "@/components/illustrations"
import {focusRingOnDark} from "@/components/focus"
import {playClarinet} from "@/lib/clarinet"
import {useSiteSettings} from "@/lib/site-settings"
import {useTimeouts} from "@/lib/use-timeouts"
import {
    GARBAGE_AT_MS, addGarbage, appendLines, checkout, complete, initialLines, interruptionReport, isDirty,
    parseCommand, runCode, runCommand, suggestions, type LineKind, type PlaygroundState, type Result, type Site,
} from "./commands"

const LINE_COLOR: Record<LineKind, string> = {
    cmd: "text-term",
    dim: "text-term-comment",
    info: "text-term-info",
    acc: "text-term-keyword",
    ok: "text-term-string",
    err: "text-term-error",
    warn: "text-term-warn",
}

type Local = Omit<PlaygroundState, "draft" | "cfg"> & {draft: Site | null}

const TOKEN = `cursor-pointer rounded border border-dashed border-[#6A6690] bg-term-token px-1 font-[inherit] text-yellow hover:border-yellow ${focusRingOnDark}`
const TERM_BUTTON = `cursor-pointer rounded-md border-0 bg-yellow px-3 font-mono text-[13px] text-[#1E1D2B] min-h-[34px] ${focusRingOnDark}`

/** Terminal output grows line by line up to this height, then scrolls. */
const MAX_OUTPUT_PX = 150
const OUTPUT_PADDING_PX = 16

const Keyword = ({children}: {children: React.ReactNode}) => <span className="text-term-keyword">{children}</span>
const Str = ({children}: {children: React.ReactNode}) => <span className="text-term-string">{children}</span>

export function Playground() {
    const {theme, catStroll, setTheme, setCatStroll} = useSiteSettings()
    const later = useTimeouts()

    const [local, setLocal] = useState<Local>({draft: null, runs: 0, garbage: false, interruptionDone: false})
    const [lines, setLines] = useState(initialLines)
    const [input, setInput] = useState("")
    const [walking, setWalking] = useState(false)
    const outputRef = useRef<HTMLDivElement>(null)
    const [outputHeight, setOutputHeight] = useState(0)

    useEffect(() => {
        const el = outputRef.current
        if (!el) return

        const observer = new ResizeObserver(() => setOutputHeight(el.offsetHeight))
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // What is applied to the page lives in site settings; the draft follows it until the code is edited.
    const applied: Site = {theme, cat: catStroll}
    const state: PlaygroundState = {...local, cfg: applied, draft: local.draft ?? applied}

    function apply(result: Result) {
        const {state: next, effects} = result
        setLocal(l => ({...l, draft: next.draft, runs: next.runs, garbage: next.garbage, interruptionDone: next.interruptionDone}))
        setLines(current => effects.some(e => e.type === "clear") ? [] : appendLines(current, result.lines))

        for (const effect of effects) {
            if (effect.type === "play") playClarinet()
            else if (effect.type === "setTheme") setTheme(effect.theme)
            else if (effect.type === "setCatStroll") setCatStroll(effect.on)
            else if (effect.type === "catWalk") {
                setWalking(true)
                later(effect.ms, () => {
                    setWalking(false)
                    if (effect.interrupt) setLines(current => appendLines(current, interruptionReport()))
                })
                if (effect.interrupt) later(GARBAGE_AT_MS, () => setLocal(addGarbage))
            }
        }
    }

    function exec(raw: string) {
        setInput("")
        apply(runCommand(state, parseCommand(raw)))
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault()
            exec(input)
        } else if (e.key === "Tab") {
            const completion = complete(input)
            if (completion) {
                e.preventDefault()
                setInput(completion)
            }
        }
    }

    const edit = (change: (site: Site) => Site) => setLocal(l => ({...l, draft: change(l.draft ?? applied)}))

    return (
        <div className="relative -rotate-[1.5deg] rounded-[14px] border-2 border-ink bg-code shadow-[7px_7px_0_var(--color-lavender)] transition-colors duration-500">
            <div className="flex items-center gap-2.5 border-b border-code-line py-2.5 pl-[18px] pr-3">
                <span className="font-mono text-[13px] text-term">about.ts</span>
                <span className="font-mono text-xs text-yellow">{isDirty(state) ? "● unsaved" : ""}</span>
                <button type="button" onClick={() => apply(runCode(state))}
                        className={`ml-auto inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-md border border-term-edge bg-term-token px-3 font-mono text-xs text-term hover:border-term-string ${focusRingOnDark}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1v8l7-4z" className="fill-term-string"/></svg>
                    run
                </button>
            </div>

            <pre className="m-0 whitespace-pre-wrap px-[22px] pb-5 pt-[18px] font-mono text-[14.5px] leading-[1.75] text-term">
                <Keyword>export const</Keyword>{" behnam = {\n  role: "}<Str>&apos;software engineer&apos;</Str>{",\n  city: "}<Str>&apos;Amsterdam&apos;</Str>{",\n  lifeIn: ["}<Str>&apos;cat&apos;</Str>{", "}<Str>&apos;code&apos;</Str>{", "}<Str>&apos;clarinet&apos;</Str>{"],\n  cat: "}<Str>&apos;Miya&apos;</Str>{",\n"}
                {state.garbage && <span className="bg-term-error/15 text-term-error">{"  fffjjjjjjj;;;;;;;;\n"}</span>}
                {"}\n\n"}<span className="text-term-comment">{"// click a value, then run"}</span>{"\n"}<Keyword>export const</Keyword>{" site = {\n  theme: "}
                <button type="button" className={TOKEN} aria-label={`'${state.draft.theme}', change theme`}
                        onClick={() => edit(s => ({...s, theme: s.theme === "day" ? "night" : "day"}))}>&apos;{state.draft.theme}&apos;</button>
                {",\n  cat: "}
                <button type="button" className={TOKEN} aria-label={`${state.draft.cat}, let Miya walk the page`}
                        onClick={() => edit(s => ({...s, cat: !s.cat}))}>{String(state.draft.cat)}</button>
                {",\n}"}
            </pre>

            {walking && <MiyaWalking className="pointer-events-none absolute left-0 top-[150px] z-[3] animate-across"/>}

            <div className="border-t border-code-line">
                {/* The wrapper's height follows the output, so each new line eases in instead of jumping. */}
                <div className="overflow-hidden transition-[height] duration-200 ease-out"
                     style={{height: outputHeight ? Math.min(outputHeight + OUTPUT_PADDING_PX, MAX_OUTPUT_PX) : 0}}>
                    <div aria-live="polite" className="flex h-full flex-col-reverse overflow-y-auto px-[22px] pb-1 pt-3">
                        <div ref={outputRef} className="whitespace-pre-wrap font-mono text-[13.5px] leading-[1.7] [overflow-wrap:anywhere]">
                            {lines.map((line, i) => <div key={i} className={`animate-fade ${LINE_COLOR[line.kind]}`}>{line.text}</div>)}
                            {state.garbage && (
                                <button type="button" className={`${TERM_BUTTON} mb-1 mt-2`} onClick={() => apply(checkout(state))}>
                                    $ git checkout -- about.ts
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Keeps its height when there are no suggestions, so typing never shifts the layout. */}
                <div className="flex min-h-9 flex-wrap content-start gap-1.5 px-[22px] pt-1.5">
                    {suggestions(input).map(cmd => (
                        <button key={cmd} type="button" onClick={() => exec(cmd)}
                                className={`min-h-[30px] cursor-pointer rounded-full border border-term-edge bg-term-token px-2.5 font-mono text-xs text-term hover:border-term-keyword ${focusRingOnDark}`}>
                            {cmd}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2.5 rounded-b-xl px-[22px] pb-3.5 pt-2 font-mono text-sm text-term-keyword focus-within:outline-2 focus-within:-outline-offset-4 focus-within:outline-dashed focus-within:outline-term-keyword">
                    ›
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
                           aria-label="Type a command, or help" placeholder="help" autoComplete="off" spellCheck={false}
                           className="min-h-9 min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-term outline-none placeholder:text-term-comment"/>
                </label>
            </div>
        </div>
    )
}
