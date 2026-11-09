import type {AgentId, ProxyNote} from "@/content/proxy-notes"

/** 1 = at the source, 2 = with Behnam, 3 = edited, 4 = delivered */
export type Phase = 1 | 2 | 3 | 4

export interface RelayState {
    index: number
    phase: Phase
    busy: boolean
}

export interface RelayStep {
    afterMs: number
    apply: (state: RelayState) => RelayState
}

export const initialRelay: RelayState = {index: 0, phase: 1, busy: false}

/** ms after a note leaves its source: it lands by 1000, Behnam reads until 1900, then fixes or passes it on, and at 3500 it flies on */
export const TRAVEL = {edit: 1900, deliver: 3500, done: 4500}
/** ms a fresh note sits at its source while it streams in and can be read */
export const NEXT_NOTE_DELAY = 2600
export const FIRST_NOTE_DELAY = NEXT_NOTE_DELAY
/** ms to rest on a delivered note before the next one appears */
export const DELIVERED_REST = 1800

/** The stage is laid out twice: wide on tablets and up, narrow on phones. */
export type Layout = "wide" | "narrow"
export type Spot = [number, number]
export const LAYOUTS: Layout[] = ["wide", "narrow"]

/** Agent windows, Behnam and the slip's resting point, as percentages of the stage. */
export const SPOTS: Record<Layout, Record<AgentId, Spot>> = {
    wide: {planner: [16, 20], coder: [84, 20], reviewer: [84, 82]},
    narrow: {planner: [25, 12], coder: [75, 12], reviewer: [50, 90]},
}
/** Where the slip waits beside each agent: in open space, clear of every window and of Behnam. */
export const REST: Record<Layout, Record<AgentId, Spot>> = {
    wide: {planner: [24, 45], coder: [76, 45], reviewer: [60, 80]},
    narrow: {planner: [30, 30], coder: [70, 30], reviewer: [50, 72]},
}
const CENTER: Record<Layout, Spot> = {wide: [50, 52], narrow: [50, 52]}
const WITH_BEHNAM: Record<Layout, Spot> = {wide: [50, 20], narrow: [50, 30]}

/** Dashed lines from the given agents (all by default) to the center only, in stage percentages. */
export const connectorPath = (layout: Layout, ids = Object.keys(SPOTS[layout]) as AgentId[]) => {
    const [cx, cy] = CENTER[layout]
    return ids.map(id => SPOTS[layout][id]).map(([x, y]) => `M${x} ${y}L${cx} ${cy}`).join("")
}

const travel = (offset: number): RelayStep[] => [
    {afterMs: offset, apply: s => ({...s, phase: 2})},
    {afterMs: offset + TRAVEL.edit, apply: s => ({...s, phase: 3})},
    {afterMs: offset + TRAVEL.deliver, apply: s => ({...s, phase: 4})},
    {afterMs: offset + TRAVEL.done, apply: s => ({...s, busy: false})},
]

/** Behnam's own notes are written at his desk and go straight out, with no stop to review. */
const sendOwn = (offset: number): RelayStep[] => [
    {afterMs: offset, apply: s => ({...s, phase: 4})},
    {afterMs: offset + TRAVEL.done - TRAVEL.deliver, apply: s => ({...s, busy: false})},
]

const isOwn = (note: ProxyNote) => note.from === "behnam"

/** Starts passing the note; null while a pass is already running. */
export function passNote(state: RelayState, notes: ProxyNote[]): {state: RelayState, steps: RelayStep[]} | null {
    if (state.busy) return null

    if (state.phase === 4) {
        const index = (state.index + 1) % notes.length
        return {
            state: {index, phase: 1, busy: true},
            steps: isOwn(notes[index]) ? sendOwn(NEXT_NOTE_DELAY) : travel(NEXT_NOTE_DELAY),
        }
    }

    if (isOwn(notes[state.index])) return {state: {...state, phase: 4, busy: true}, steps: sendOwn(0).slice(1)}
    return {state: {...state, phase: 2, busy: true}, steps: travel(0).slice(1)}
}

/** How long autoplay waits before the next pass; null while one is running. */
export const nextDelay = (state: RelayState) => state.busy ? null : state.phase === 4 ? DELIVERED_REST : FIRST_NOTE_DELAY

export interface RelayView {
    agents: Record<AgentId, {spots: Record<Layout, Spot>, status: string, active: boolean}>
    slip: {spots: Record<Layout, Spot>, rotation: number, text: string, fix?: string, edited: boolean, forwarded: boolean}
    /** the connector the slip is travelling along, if any */
    leg: AgentId | null
    penWriting: boolean
}

export function relayView(state: RelayState, notes: ProxyNote[]): RelayView {
    const {phase, busy} = state
    const note = notes[state.index]
    const ids = Object.keys(SPOTS.wide) as AgentId[]

    const agents = Object.fromEntries(ids.map(id => {
        let status = "idle"
        if (id === note.from) status = phase <= 1 ? "writing a note…" : "sent ✓"
        if (id === note.to) status = phase === 4 ? "got it ✓" : "waiting…"

        const active = (id === note.from && phase === 1) || (id === note.to && phase === 4)
        return [id, {spots: {wide: SPOTS.wide[id], narrow: SPOTS.narrow[id]}, status, active}]
    })) as RelayView["agents"]

    const from = note.from === "behnam" ? null : note.from
    const slipAt = (layout: Layout): Spot =>
        phase === 1 && from ? REST[layout][from]
            : phase === 4 ? REST[layout][note.to]
                : WITH_BEHNAM[layout]

    return {
        agents,
        slip: {
            spots: {wide: slipAt("wide"), narrow: slipAt("narrow")},
            rotation: phase === 1 ? -4 : phase === 4 ? 3 : -1,
            text: note.text,
            fix: note.fix,
            edited: phase >= 3 && note.fix !== undefined,
            forwarded: phase >= 3 && note.fix === undefined && from !== null,
        },
        leg: phase === 2 ? from : phase === 4 && busy ? note.to : null,
        penWriting: from ? phase === 3 && busy : phase === 1,
    }
}
