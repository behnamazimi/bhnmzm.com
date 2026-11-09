import {useEffect, useState, useSyncExternalStore, type RefObject} from "react"

const QUERY = "(prefers-reduced-motion: reduce)"
const subscribe = (onChange: () => void) => {
    const mql = window.matchMedia(QUERY)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
}

/** True while the element is on screen and the visitor hasn't asked for reduced motion: autoplay gate. */
export function usePlaying(ref: RefObject<Element | null>) {
    const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])

    return visible && !reducedMotion
}
