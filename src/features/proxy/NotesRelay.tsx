"use client"

import Image from "next/image"
import {useEffect, useRef, useState, type CSSProperties} from "react"
import {Handwritten} from "@/components/Handwritten"
import {RedPen} from "@/components/illustrations"
import type {AgentId, ProxyNote} from "@/content/proxy-notes"
import {usePlaying} from "@/lib/use-playing"
import {useTimeouts} from "@/lib/use-timeouts"
import {connectorPath, initialRelay, nextDelay, passNote, relayView, type Layout, type Spot} from "./relay"

const AGENTS: {id: AgentId, dot: string, shadow: string}[] = [
    {id: "planner", dot: "bg-lavender", shadow: "var(--color-lavender)"},
    {id: "coder", dot: "bg-sky", shadow: "var(--color-sky)"},
    {id: "reviewer", dot: "bg-peach", shadow: "var(--color-peach)"},
]

const AGENT = "absolute z-[1] w-[clamp(100px,21cqw,210px)] rounded-[10px] border-2 border-ink bg-card shadow-[5px_5px_0_var(--sh)] transition-[transform,box-shadow,background-color] duration-300 [transform:translate(-50%,-50%)]"
const AGENT_ACTIVE = "shadow-[9px_9px_0_var(--sh)] [transform:translate(-50%,-50%)_translateY(-6px)]"
// left/top come from per-layout custom properties: phone layout by default, wide from `sm`.
const PLACED = "left-(--nl) top-(--nt) sm:left-(--wl) sm:top-(--wt)"
const CAPTION = "they never talk to each other directly. everything goes through me."

const place = (spots: Record<Layout, Spot>) => ({
    "--nl": `${spots.narrow[0]}%`, "--nt": `${spots.narrow[1]}%`,
    "--wl": `${spots.wide[0]}%`, "--wt": `${spots.wide[1]}%`,
}) as CSSProperties

export function NotesRelay({notes}: {notes: ProxyNote[]}) {
    const later = useTimeouts()
    const stageRef = useRef<HTMLDivElement>(null)
    const playing = usePlaying(stageRef)
    const [state, setState] = useState(initialRelay)
    const view = relayView(state, notes)

    // The notes pass themselves: wait, send, rest on the delivered note, repeat.
    useEffect(() => {
        const delay = nextDelay(state)
        if (!playing || delay === null) return

        const id = setTimeout(() => {
            const next = passNote(state, notes)
            if (!next) return

            setState(next.state)
            next.steps.forEach(({afterMs, apply}) => later(afterMs, () => setState(apply)))
        }, delay)
        return () => clearTimeout(id)
    }, [playing, state, notes, later])

    return (
        <>
            <div ref={stageRef} className="@container relative mx-auto mt-14 aspect-[3/4] w-full max-w-[1040px] sm:aspect-[16/8.5]">
                {(["narrow", "wide"] as const).map(layout => (
                    <svg key={layout} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
                         className={`absolute inset-0 size-full ${layout === "narrow" ? "sm:hidden" : "hidden sm:block"}`}>
                        <path d={connectorPath(layout)} fill="none" className="stroke-line" strokeWidth="2.5" strokeDasharray="6 8" vectorEffect="non-scaling-stroke"/>
                        {view.leg && (
                            <path d={connectorPath(layout, [view.leg])} fill="none" className="animate-flow stroke-accent" strokeWidth="2.5" strokeDasharray="6 10" vectorEffect="non-scaling-stroke"/>
                        )}
                    </svg>
                ))}

                {AGENTS.map(({id, dot, shadow}) => {
                    const agent = view.agents[id]
                    return (
                        <div key={id} className={`${AGENT} ${PLACED} ${agent.active ? AGENT_ACTIVE : ""}`}
                             style={{...place(agent.spots), "--sh": shadow} as CSSProperties}>
                            <div className="flex items-center gap-2 border-b-2 border-ink px-2 py-2 @md:px-3">
                                <span aria-hidden="true" className={`size-[9px] rounded-full border-[1.5px] border-ink ${dot}`}/>
                                <span className="font-mono text-[13px] font-medium">{id}</span>
                                <span className="ml-auto hidden font-mono text-[11px] text-muted @md:inline">agent</span>
                            </div>
                            <div className="flex flex-col gap-1.5 px-2 pb-3 pt-2.5 @md:px-3">
                                <span aria-hidden="true" className={`hidden h-1.5 w-4/5 rounded-[3px] bg-line @md:block ${agent.active ? "animate-pulse-soft" : ""}`}/>
                                <span aria-hidden="true" className={`hidden h-1.5 w-[55%] rounded-[3px] bg-line @md:block ${agent.active ? "animate-pulse-soft [animation-delay:.3s]" : ""}`}/>
                                <span className="mt-0.5 font-mono text-[11px] text-muted @md:text-xs">{agent.status}</span>
                            </div>
                        </div>
                    )
                })}

                <div className="absolute left-1/2 top-[52%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                    <div className="relative size-[clamp(72px,12cqw,118px)]">
                        <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-[5px] rounded-full bg-lavender"/>
                        <Image src="/images/my-avatar.jpg" alt="Behnam" width={118} height={118}
                               className="relative block size-full rounded-full border-[2.5px] border-ink object-cover"/>
                        <span className="absolute -bottom-3.5 -right-[54px]"><RedPen writing={view.penWriting}/></span>
                    </div>
                    <span className="font-display text-[17px] font-bold">behnam</span>
                </div>

                <Handwritten decorative className="absolute bottom-[6%] left-[4%] hidden max-w-[260px] -rotate-3 text-2xl text-muted sm:block">
                    {CAPTION}
                </Handwritten>

                {/* A new key per note makes each one appear at its source instead of flying back across the stage; until the stage is on screen the key holds, so the first note streams in when it's seen. */}
                <div key={playing ? state.index : -1}
                     className={`absolute z-[4] w-[clamp(148px,42cqw,240px)] sm:w-[clamp(148px,24cqw,240px)] animate-fade rounded border-2 border-ink bg-card px-3.5 py-3 transition-[left,top,transform,box-shadow] duration-1000 ease-[cubic-bezier(.65,0,.35,1)] ${view.leg ? "shadow-[8px_10px_0_var(--color-yellow)]" : "shadow-[4px_4px_0_var(--color-yellow)]"} ${PLACED}`}
                     style={{...place(view.slip.spots), transform: `translate(-50%, -50%) rotate(${view.slip.rotation}deg) scale(${view.leg ? 1.04 : 1})`}}>
                    <div className={`font-mono text-xs leading-[1.45] @md:text-sm ${view.slip.edited ? "text-muted line-through decoration-red-pen decoration-2" : ""}`}>
                        {/* words stream in like an agent's output */}
                        {view.slip.text.split(" ").map((word, i) => (
                            <span key={i} className="animate-fade" style={{animationDelay: `${300 + i * 120}ms`}}>{word} </span>
                        ))}
                    </div>
                    {view.slip.edited && <Handwritten className="mt-1 block animate-fade text-lg text-red-pen @md:text-[26px]">{view.slip.fix}</Handwritten>}
                    {view.slip.forwarded && <Handwritten className="mt-1 block animate-fade text-right text-lg text-red-pen @md:text-[22px]">fwd ✓</Handwritten>}
                </div>
            </div>

            <Handwritten decorative className="mt-4 block text-center text-xl text-muted sm:hidden">{CAPTION}</Handwritten>
        </>
    )
}
