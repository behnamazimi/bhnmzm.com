import {useCallback, useRef, useState} from "react"

/** Percent of the desk, measured from its top-left corner. */
export interface Point {
    x: number
    y: number
}

/** A pointer move of at least this many px is a drag; anything less is a click. */
export const DRAG_THRESHOLD = 5

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

interface Drag<K> {
    id: K
    startX: number
    startY: number
    origin: Point
    min: Point
    max: Point
    moved: boolean
}

export function useDraggable<K extends string>(initial: Record<K, Point>, onTap: (id: K) => void) {
    const deskRef = useRef<HTMLDivElement>(null)
    const drag = useRef<Drag<K> | null>(null)
    const [positions, setPositions] = useState(initial)
    const [lifted, setLifted] = useState<K | null>(null)
    // Until an object is dragged it keeps its CSS-clamped starting spot inside the desk.
    const [dragged, setDragged] = useState<Partial<Record<K, boolean>>>({})

    const bind = useCallback((id: K) => ({
        onPointerDown(e: React.PointerEvent<HTMLElement>) {
            const desk = deskRef.current
            if (!desk) return

            const el = e.currentTarget
            el.setPointerCapture(e.pointerId)

            // Objects may go anywhere on the page: bounds are the document edges, as percent of the desk.
            const rect = desk.getBoundingClientRect()
            const page = document.documentElement
            const left = rect.left + window.scrollX
            const top = rect.top + window.scrollY
            const toX = (px: number) => (px / desk.clientWidth) * 100
            const toY = (px: number) => (px / desk.clientHeight) * 100

            drag.current = {
                id,
                startX: e.clientX,
                startY: e.clientY,
                origin: {x: toX(el.offsetLeft), y: toY(el.offsetTop)},
                min: {x: toX(-left), y: toY(-top)},
                max: {x: toX(page.clientWidth - left - el.offsetWidth), y: toY(page.scrollHeight - top - el.offsetHeight)},
                moved: false,
            }
            setLifted(id)
        },
        onPointerMove(e: React.PointerEvent<HTMLElement>) {
            const d = drag.current
            const desk = deskRef.current
            if (!d || !desk || d.id !== id) return

            const dx = e.clientX - d.startX
            const dy = e.clientY - d.startY
            if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return

            d.moved = true
            setDragged(m => m[id] ? m : {...m, [id]: true})
            setPositions(p => ({
                ...p,
                [id]: {
                    x: clamp(d.origin.x + (dx / desk.clientWidth) * 100, d.min.x, d.max.x),
                    y: clamp(d.origin.y + (dy / desk.clientHeight) * 100, d.min.y, d.max.y),
                },
            }))
        },
        onPointerUp() {
            const d = drag.current
            drag.current = null
            setLifted(null)
            if (d && d.id === id && !d.moved) onTap(id)
        },
        onPointerCancel() {
            drag.current = null
            setLifted(null)
        },
        // Enter/Space fire a click with detail 0; real clicks are already handled on pointer up.
        onClick(e: React.MouseEvent) {
            if (e.detail === 0) onTap(id)
        },
    }), [onTap])

    return {deskRef, positions, dragged, lifted, bind}
}
