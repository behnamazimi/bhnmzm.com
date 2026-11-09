"use client"

import Image from "next/image"
import {useCallback, useState, type CSSProperties} from "react"
import {Clarinet, CommandKey, MiyaSitting} from "@/components/illustrations"
import {Handwritten} from "@/components/Handwritten"
import {focusRing} from "@/components/focus"
import {playClarinet} from "@/lib/clarinet"
import {useTimeouts} from "@/lib/use-timeouts"
import {useDraggable} from "./use-draggable"

type ObjectId = "clar" | "key" | "miya"

const TAG_MS = 2600

// Percent of the desk; until dragged, a CSS clamp keeps each object inside it on narrow screens.
const START = {clar: {x: 0, y: 9}, key: {x: 80, y: 4}, miya: {x: 72, y: 68}}
const SIZE = {clar: [190, 60], key: [92, 92], miya: [124, 134]} as const
const ROTATION = {clar: -24, key: 8, miya: -2} as const

const OBJECT = "absolute z-[1] cursor-grab touch-none select-none rounded-xl border-0 bg-transparent p-0 [transform:var(--rot)] [filter:drop-shadow(0_6px_0_rgba(30,29,43,.12))] transition-[transform,filter] duration-[250ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:[transform:var(--rot)_translateY(-4px)]"
const LIFTED = "z-[5] cursor-grabbing [transform:var(--rot)_scale(1.1)] [filter:drop-shadow(0_16px_10px_rgba(30,29,43,.22))]"
const TAG = "pointer-events-none absolute left-1/2 top-full animate-pop whitespace-nowrap font-hand text-[21px] font-semibold text-ink [transform:translateX(-50%)]"

export function Desk() {
    const later = useTimeouts()
    const [open, setOpen] = useState<Record<ObjectId, boolean>>({clar: false, key: false, miya: false})

    const onTap = useCallback((id: ObjectId) => {
        if (id === "miya") {
            setOpen(o => ({...o, miya: !o.miya}))
            return
        }

        setOpen(o => ({...o, [id]: true}))
        // the clarinet's tag stays up for as long as the phrase plays
        const shownMs = id === "clar" ? Math.max(TAG_MS, playClarinet()) : TAG_MS
        later(shownMs, () => setOpen(o => ({...o, [id]: false})))
    }, [later])

    const {deskRef, positions, dragged, lifted, bind} = useDraggable<ObjectId>(START, onTap)

    const objectProps = (id: ObjectId, label: string) => {
        const [w, h] = SIZE[id]
        const {x, y} = positions[id]
        const style = {
            left: dragged[id] ? `${x}%` : `clamp(0px, ${x}%, calc(100% - ${w}px))`,
            top: dragged[id] ? `${y}%` : `clamp(0px, ${y}%, calc(100% - ${h}px))`,
            "--rot": `rotate(${ROTATION[id]}deg)`,
        } as CSSProperties

        return {
            style,
            className: `${OBJECT} ${focusRing} ${lifted === id ? LIFTED : ""}`,
            "aria-label": label,
            ...bind(id),
        }
    }

    return (
        <div ref={deskRef} role="group" aria-label="My desk: Miya the cat, a keyboard key and a clarinet. Drag them around, or click one." className="relative h-[540px]">
            <div className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[150px] size-[300px]">
                <div aria-hidden="true" className="absolute -inset-[22px] translate-x-[10px] translate-y-[8px] animate-morph bg-peach"/>
                <div className="absolute inset-0 animate-morph overflow-hidden border-[2.5px] border-ink bg-lavender-soft">
                    <Image src="/images/my-avatar.jpg" alt="Behnam Azimi smiling" width={300} height={300} priority className="block size-full object-cover will-change-transform"/>
                </div>
            </div>

            <button type="button" {...objectProps("clar", "Clarinet: play a short phrase")}>
                <Clarinet className="pointer-events-none block"/>
                {open.clar && (
                    <>
                        <span aria-hidden="true" className="pointer-events-none absolute left-[164px] top-[-13px] animate-floatup text-[30px] text-yellow">♪</span>
                        <span aria-hidden="true" className="pointer-events-none absolute left-[182px] top-[-6px] animate-floatup text-[30px] text-yellow [animation-delay:.4s]">♫</span>
                        <span aria-hidden="true" className="pointer-events-none absolute left-[154px] top-[-2px] animate-floatup text-[30px] text-yellow [animation-delay:.8s]">♪</span>
                        <span className={TAG}>♪ a synth stand-in, for now</span>
                    </>
                )}
            </button>

            <button type="button" {...objectProps("key", "Command key")}>
                <CommandKey pressed={open.key} className="pointer-events-none block"/>
                {open.key && <span className={TAG}>I love shortcuts</span>}
            </button>

            <button type="button" aria-pressed={open.miya} {...objectProps("miya", "Miya the cat")}>
                <MiyaSitting awake={open.miya} className="pointer-events-none block"/>
                {open.miya && <span className={TAG}>mrrp? (that&apos;s Miya)</span>}
            </button>

            <Handwritten decorative className="absolute -bottom-2.5 right-0 -rotate-[4deg] text-2xl text-muted">
                Miya hates being dragged. She&apos;ll live.
            </Handwritten>
        </div>
    )
}
