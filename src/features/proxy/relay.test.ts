import {describe, expect, it} from "vitest"
import {proxyNotes, type ProxyNote} from "@/content/proxy-notes"
import {connectorPath, initialRelay, nextDelay, passNote, relayView, REST, type RelayState} from "./relay"

const notes: ProxyNote[] = [
    {from: "planner", to: "coder", text: "Plan: 14 steps.", fix: "One line."},
    {from: "coder", to: "reviewer", text: "PR is up."},
    {from: "behnam", to: "planner", text: "Spec: fix login."},
]

const run = (state: RelayState, list = proxyNotes) => {
    const pass = passNote(state, list)!
    return pass.steps.reduce((s, step) => step.apply(s), pass.state)
}

describe("passNote", () => {
    it("does nothing while busy", () => {
        expect(passNote({...initialRelay, busy: true}, notes)).toBeNull()
    })

    it("moves a fresh note to Behnam, then edits, delivers and frees the button", () => {
        const pass = passNote(initialRelay, notes)!
        expect(pass.state).toEqual({index: 0, phase: 2, busy: true})
        expect(pass.steps.map(s => s.afterMs)).toEqual([1900, 3500, 4500])
        expect(pass.steps.map(s => s.apply(initialRelay)).map(s => [s.phase, s.busy])).toEqual([[3, false], [4, false], [1, false]])
        expect(run(initialRelay, notes)).toEqual({index: 0, phase: 4, busy: false})
    })

    it("holds the next note at its source for 2600ms before it travels", () => {
        const pass = passNote({index: 0, phase: 4, busy: false}, notes)!
        expect(pass.state).toEqual({index: 1, phase: 1, busy: true})
        expect(pass.steps.map(s => s.afterMs)).toEqual([2600, 4500, 6100, 7100])
    })

    it("sends Behnam's own note straight out, with no stop to review", () => {
        const fresh = passNote({index: 1, phase: 4, busy: false}, notes)!
        expect(fresh.state).toEqual({index: 2, phase: 1, busy: true})
        expect(fresh.steps.map(s => s.afterMs)).toEqual([2600, 3600])
        expect(fresh.steps.map(s => s.apply(fresh.state).phase)).toEqual([4, 1])

        const first = passNote({index: 2, phase: 1, busy: false}, notes)!
        expect(first.state).toEqual({index: 2, phase: 4, busy: true})
        expect(first.steps.map(s => s.afterMs)).toEqual([1000])
    })

    it("wraps from the last note back to the first", () => {
        expect(run({index: proxyNotes.length - 1, phase: 4, busy: false})).toEqual({index: 0, phase: 4, busy: false})
    })
})

describe("nextDelay", () => {
    it("waits briefly before the first note and rests on a delivered one", () => {
        expect(nextDelay(initialRelay)).toBe(2600)
        expect(nextDelay({index: 0, phase: 4, busy: false})).toBe(1800)
    })

    it("does not schedule while a pass is running", () => {
        expect(nextDelay({index: 0, phase: 2, busy: true})).toBeNull()
    })

    it("keeps the loop going through every note and back to the first", () => {
        let state = initialRelay
        const seen: number[] = []
        const laps = proxyNotes.length * 2 + 1
        for (let i = 0; i < laps; i++) {
            state = run(state)
            seen.push(state.index)
        }
        expect(seen).toEqual(Array.from({length: laps}, (_, i) => i % proxyNotes.length))
    })
})

describe("connectorPath", () => {
    it("draws from each agent to the center only", () => {
        expect(connectorPath("wide")).toBe("M16 20L50 52M84 20L50 52M84 82L50 52")
        expect(connectorPath("narrow").match(/M/g)).toHaveLength(3)
        expect(connectorPath("wide", ["coder"])).toBe("M84 20L50 52")
    })
})

describe("relayView", () => {
    it("starts with the planner writing and the coder waiting", () => {
        const v = relayView(initialRelay, notes)
        expect(v.agents.planner).toMatchObject({status: "writing a note…", active: true})
        expect(v.agents.coder).toMatchObject({status: "waiting…", active: false})
        expect(v.agents.reviewer.status).toBe("idle")
    })

    it("rests the slip beside its source agent", () => {
        expect(relayView(initialRelay, notes).slip.spots).toEqual({wide: REST.wide.planner, narrow: REST.narrow.planner})
    })

    it("lays the narrow stage out separately", () => {
        const v = relayView(initialRelay, notes)
        expect(v.agents.planner.spots.narrow).toEqual([25, 12])
        expect(v.slip.spots.narrow).toEqual([30, 30])
    })

    it("puts the slip with Behnam while it travels and is edited", () => {
        const v = relayView({index: 0, phase: 2, busy: true}, notes)
        expect(v.slip.spots.wide).toEqual([50, 20])
        expect(v.slip.edited).toBe(false)
        expect(v.leg).toBe("planner")
        expect(v.agents.planner.status).toBe("sent ✓")

        const edited = relayView({index: 0, phase: 3, busy: true}, notes)
        expect(edited.slip.edited).toBe(true)
        expect(edited.penWriting).toBe(true)
        expect(edited.slip.forwarded).toBe(false)
        expect(edited.leg).toBeNull()
    })

    it("passes a note without a fix on untouched", () => {
        const v = relayView({index: 1, phase: 3, busy: true}, notes)
        expect(v.slip.edited).toBe(false)
        expect(v.slip.forwarded).toBe(true)
        expect(relayView({index: 1, phase: 2, busy: true}, notes).slip.forwarded).toBe(false)
    })

    it("writes Behnam's own note at his desk and sends it without a stamp", () => {
        const writing = relayView({index: 2, phase: 1, busy: false}, notes)
        expect(writing.slip.spots.wide).toEqual([50, 20])
        expect(writing.penWriting).toBe(true)
        expect(writing.agents.planner.status).toBe("waiting…")

        const sent = relayView({index: 2, phase: 4, busy: true}, notes)
        expect(sent.leg).toBe("planner")
        expect(sent.slip.forwarded).toBe(false)
        expect(sent.penWriting).toBe(false)
    })

    it("delivers to the recipient", () => {
        expect(relayView({index: 0, phase: 4, busy: true}, notes).leg).toBe("coder")

        const v = relayView({index: 0, phase: 4, busy: false}, notes)
        expect(v.leg).toBeNull()
        expect(v.agents.coder).toMatchObject({status: "got it ✓", active: true})
        expect(v.slip.spots.wide).toEqual(REST.wide.coder)
        expect(v.penWriting).toBe(false)
    })
})
