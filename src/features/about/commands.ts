import type {Theme} from "@/lib/site-settings"

export type LineKind = "cmd" | "dim" | "info" | "acc" | "ok" | "err" | "warn"

export interface TermLine {
    text: string
    kind: LineKind
}

export interface Site {
    theme: Theme
    cat: boolean
}

export interface PlaygroundState {
    /** values currently shown in the code editor */
    draft: Site
    /** values last applied to the page */
    cfg: Site
    runs: number
    /** Miya's keyboard mash is in the editor until `git checkout` */
    garbage: boolean
    interruptionDone: boolean
}

export type Effect =
    | {type: "play"}
    | {type: "catWalk", ms: number, interrupt: boolean}
    | {type: "setTheme", theme: Theme}
    | {type: "setCatStroll", on: boolean}
    | {type: "clear"}

export interface Result {
    state: PlaygroundState
    lines: TermLine[]
    effects: Effect[]
}

/** `input` is the trimmed text as typed, echoed back in the terminal */
export type Command = {input: string} & (
    | {type: "empty"}
    | {type: "help" | "clear" | "play" | "cat" | "code"}
    | {type: "set", key: "theme" | "cat", raw: string}
    | {type: "unknown"}
)

export const COMMANDS = ["help", "behnam.play()", "behnam.cat()", "behnam.code()", "site.theme = 'night'", "site.theme = 'day'", "site.cat = true", "site.cat = false", "clear"]
const DEFAULT_SUGGESTIONS = ["help", "behnam.play()", "site.cat = true"]

export const MAX_LINES = 50
export const MAX_SUGGESTIONS = 3
/** how long Miya is on screen, and when in that window she mashes the keyboard */
export const CAT_WALK_MS = 2800
export const GARBAGE_AT_MS = 1300

const ERROR_TS1005 = "about.ts(6,3): error TS1005: ',' expected."

const line = (text: string, kind: LineKind): TermLine => ({text, kind})
const sameSite = (a: Site, b: Site) => a.theme === b.theme && a.cat === b.cat

export const initialPlaygroundState: PlaygroundState = {
    draft: {theme: "night", cat: false},
    cfg: {theme: "night", cat: false},
    runs: 0,
    garbage: false,
    interruptionDone: false,
}

export const initialLines: TermLine[] = []

export const appendLines = (lines: TermLine[], added: TermLine[]) => [...lines, ...added].slice(-MAX_LINES)

export const isDirty = (state: PlaygroundState) => !sameSite(state.draft, state.cfg)

export function parseCommand(input: string): Command {
    const cmd = input.trim()
    const set = cmd.match(/^site\.(theme|cat)\s*=\s*(.+)$/)

    if (!cmd) return {type: "empty", input: cmd}
    if (set) return {type: "set", key: set[1] as "theme" | "cat", raw: set[2], input: cmd}
    switch (cmd) {
        case "help": return {type: "help", input: cmd}
        case "clear": return {type: "clear", input: cmd}
        case "behnam.play()": return {type: "play", input: cmd}
        case "behnam.cat()": return {type: "cat", input: cmd}
        case "behnam.code()": return {type: "code", input: cmd}
        default: return {type: "unknown", input: cmd}
    }
}

function setSite(state: PlaygroundState, key: "theme" | "cat", raw: string): Result {
    const value = raw.trim().replace(/^['"]|['"]$/g, "")
    const allowed = key === "theme" ? ["day", "night"] : ["true", "false"]

    if (!allowed.includes(value)) {
        return {state, effects: [], lines: [line(`error TS2322: Type '${value}' is not assignable to type '${allowed.join("' | '")}'.`, "err")]}
    }

    const site: Site = key === "theme"
        ? {...state.cfg, theme: value as Theme}
        : {...state.cfg, cat: value === "true"}
    const effect: Effect = key === "theme"
        ? {type: "setTheme", theme: site.theme}
        : {type: "setCatStroll", on: site.cat}

    return {
        state: {...state, draft: {...state.draft, [key]: site[key]}, cfg: site},
        effects: [effect],
        lines: [line(`✓ site.${key} = ${key === "cat" ? value : `'${value}'`}`, "ok")],
    }
}

export function runCommand(state: PlaygroundState, cmd: Command): Result {
    if (cmd.type === "empty") return {state, lines: [], effects: []}

    const echo = line(`› ${cmd.input}`, "cmd")
    const reply = (lines: TermLine[], effects: Effect[] = []): Result => ({state, lines, effects})

    switch (cmd.type) {
        case "help":
            return reply([
                echo,
                line("  behnam.play()     a short phrase on the clarinet", "dim"),
                line("  behnam.cat()      say hi to Miya", "dim"),
                line("  behnam.code()     what I write these days", "dim"),
                line("  site.theme = 'night'   site.cat = true", "dim"),
                line("  clear", "dim"),
            ])
        case "clear":
            return reply([], [{type: "clear"}])
        case "play":
            return reply([echo, line("♪ a short phrase on the clarinet (a synth stand-in, for now)", "warn")], [{type: "play"}])
        case "cat":
            return reply([echo, line("  Miya: 'mrrp.' She's coming over.", "warn")], [{type: "catWalk", ms: CAT_WALK_MS, interrupt: false}])
        case "code":
            return reply([echo, line("  Mostly JavaScript and TypeScript, plus simple scripts in Go and Python.", "info")])
        case "set": {
            const result = setSite(state, cmd.key, cmd.raw)
            return {...result, lines: [echo, ...result.lines]}
        }
        case "unknown":
            return reply([echo, line(`TypeError: '${cmd.input}' is not a command. Try help.`, "err")])
    }
}

/** The editor's run button: applies the draft, and on the second run Miya interrupts. */
export function runCode(state: PlaygroundState): Result {
    const runs = state.runs + 1
    const applied: PlaygroundState = {...state, runs, cfg: {...state.draft}}
    const effects: Effect[] = [
        {type: "setTheme", theme: state.draft.theme},
        {type: "setCatStroll", on: state.draft.cat},
    ]
    const header = line("$ npm run about", "cmd")

    if (state.garbage) {
        return {state: applied, effects, lines: [header, line(ERROR_TS1005, "err"), line("  hint: undo Miya first.", "warn")]}
    }

    if (runs === 2 && !state.interruptionDone) {
        return {
            state: {...applied, interruptionDone: true},
            effects: [...effects, {type: "catWalk", ms: CAT_WALK_MS, interrupt: true}],
            lines: [header],
        }
    }

    return {
        state: applied,
        effects,
        lines: [
            header,
            line("✓ compiled about.ts", "ok"),
            line("behnam  { role: 'software engineer', city: 'Amsterdam', cat: 'Miya' }", "info"),
            line(`site    { theme: '${state.draft.theme}', cat: ${state.draft.cat} }`, "acc"),
        ],
    }
}

export const addGarbage = <S extends {garbage: boolean}>(state: S): S => ({...state, garbage: true})

export const interruptionReport = (): TermLine[] => [
    line(ERROR_TS1005, "err"),
    line("    fffjjjjjjj;;;;;;;;", "err"),
    line("  hint: Miya walked across the keyboard again.", "warn"),
]

export function checkout(state: PlaygroundState): Result {
    return {
        state: {...state, garbage: false},
        effects: [],
        lines: [line("$ git checkout -- about.ts", "cmd"), line("Updated 1 path from the index. Run it again.", "ok")],
    }
}

export function suggestions(input: string) {
    if (!input) return DEFAULT_SUGGESTIONS
    return COMMANDS.filter(c => c.startsWith(input) && c !== input).slice(0, MAX_SUGGESTIONS)
}

export const complete = (input: string) => input ? suggestions(input)[0] ?? null : null
