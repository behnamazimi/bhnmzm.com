import {useCallback, useEffect, useRef} from "react"

/** `later(ms, fn)` schedules a timeout that is cancelled when the component unmounts. */
export function useTimeouts() {
    const ids = useRef<number[]>([])

    useEffect(() => {
        const pending = ids.current
        return () => pending.forEach(clearTimeout)
    }, [])

    return useCallback((ms: number, fn: () => void) => {
        ids.current.push(window.setTimeout(fn, ms))
    }, [])
}
