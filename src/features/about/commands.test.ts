import {describe, expect, it} from "vitest"
import {
    addGarbage, appendLines, checkout, complete, initialPlaygroundState, interruptionReport, isDirty,
    parseCommand, runCode, runCommand, suggestions, type PlaygroundState,
} from "./commands"

const exec = (state: PlaygroundState, input: string) => runCommand(state, parseCommand(input))
const start = initialPlaygroundState

describe("parseCommand", () => {
    it("recognises the built-in commands", () => {
        expect(parseCommand("help")).toMatchObject({type: "help"})
        expect(parseCommand("  behnam.play()  ")).toMatchObject({type: "play"})
        expect(parseCommand("clear")).toMatchObject({type: "clear"})
    })

    it("parses site assignments, tolerating spacing", () => {
        expect(parseCommand("site.theme='night'")).toMatchObject({type: "set", key: "theme", raw: "'night'"})
        expect(parseCommand("site.cat   =   true")).toMatchObject({type: "set", key: "cat", raw: "true"})
    })

    it("treats blank input as empty and anything else as unknown", () => {
        expect(parseCommand("   ")).toMatchObject({type: "empty"})
        expect(parseCommand("rm -rf")).toMatchObject({type: "unknown", input: "rm -rf"})
    })
})

describe("runCommand", () => {
    it("emits a play effect for behnam.play()", () => {
        expect(exec(start, "behnam.play()").effects).toEqual([{type: "play"}])
    })

    it("walks Miya without interrupting for behnam.cat()", () => {
        expect(exec(start, "behnam.cat()").effects).toEqual([{type: "catWalk", ms: 2800, interrupt: false}])
    })

    it("applies a valid theme and updates both draft and cfg", () => {
        const {state, effects, lines} = exec(start, "site.theme = 'night'")
        expect(effects).toEqual([{type: "setTheme", theme: "night"}])
        expect(state.draft.theme).toBe("night")
        expect(state.cfg.theme).toBe("night")
        expect(lines.map(l => l.text)).toEqual(["› site.theme = 'night'", "✓ site.theme = 'night'"])
    })

    it("turns the cat stroll on and off", () => {
        const on = exec(start, "site.cat = true")
        expect(on.effects).toEqual([{type: "setCatStroll", on: true}])
        expect(exec(on.state, "site.cat = false").effects).toEqual([{type: "setCatStroll", on: false}])
    })

    it("rejects invalid values with a TS2322 error and leaves state alone", () => {
        const {state, effects, lines} = exec(start, "site.theme = 'blue'")
        expect(state).toBe(start)
        expect(effects).toEqual([])
        expect(lines.at(-1)).toMatchObject({kind: "err", text: "error TS2322: Type 'blue' is not assignable to type 'day' | 'night'."})
    })

    it("answers unknown commands with a TypeError", () => {
        expect(exec(start, "ls").lines.at(-1)?.text).toBe("TypeError: 'ls' is not a command. Try help.")
    })

    it("prints nothing for empty input and asks the terminal to clear", () => {
        expect(exec(start, "").lines).toEqual([])
        expect(exec(start, "clear").effects).toEqual([{type: "clear"}])
    })
})

describe("runCode", () => {
    it("applies the draft values through effects", () => {
        const draft: PlaygroundState = {...start, draft: {theme: "night", cat: true}}
        const {state, effects} = runCode(draft)
        expect(state.cfg).toEqual({theme: "night", cat: true})
        expect(effects).toContainEqual({type: "setTheme", theme: "night"})
        expect(effects).toContainEqual({type: "setCatStroll", on: true})
    })

    it("compiles cleanly on the first run", () => {
        expect(runCode(start).lines.map(l => l.kind)).toEqual(["cmd", "ok", "info", "acc"])
    })

    it("lets Miya interrupt the second run exactly once", () => {
        const second = runCode(runCode(start).state)
        expect(second.effects).toContainEqual({type: "catWalk", ms: 2800, interrupt: true})
        expect(second.state.interruptionDone).toBe(true)

        const third = runCode(runCode(second.state).state)
        expect(third.effects.some(e => e.type === "catWalk")).toBe(false)
    })

    it("refuses to compile while Miya's garbage is in the file", () => {
        const dirty = addGarbage(start)
        const {lines, effects} = runCode(dirty)
        expect(lines.map(l => l.text)).toContain("about.ts(6,3): error TS1005: ',' expected.")
        expect(effects.some(e => e.type === "catWalk")).toBe(false)
        expect(interruptionReport()).toHaveLength(3)
    })
})

describe("checkout", () => {
    it("removes the garbage", () => {
        const {state, lines} = checkout(addGarbage(start))
        expect(state.garbage).toBe(false)
        expect(lines[0].text).toBe("$ git checkout -- about.ts")
    })
})

describe("isDirty", () => {
    it("is true when the draft differs from what was last run", () => {
        expect(isDirty(start)).toBe(false)
        expect(isDirty({...start, draft: {theme: "day", cat: false}})).toBe(true)
    })
})

describe("suggestions and completion", () => {
    it("offers the defaults for empty input", () => {
        expect(suggestions("")).toEqual(["help", "behnam.play()", "site.cat = true"])
    })

    it("matches by prefix, excluding exact matches and capping at three", () => {
        expect(suggestions("site.")).toHaveLength(3)
        expect(suggestions("behnam.c")).toEqual(["behnam.cat()", "behnam.code()"])
        expect(suggestions("help")).toEqual([])
    })

    it("completes with the first match on Tab", () => {
        expect(complete("behnam.p")).toBe("behnam.play()")
        expect(complete("zzz")).toBeNull()
        expect(complete("")).toBeNull()
    })
})

describe("appendLines", () => {
    it("keeps only the last 50 lines", () => {
        const many = Array.from({length: 60}, (_, i) => ({text: String(i), kind: "dim" as const}))
        const lines = appendLines([], many)
        expect(lines).toHaveLength(50)
        expect(lines[0].text).toBe("10")
    })
})
