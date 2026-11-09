"use client"

import {createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore} from "react"
import {DEFAULT_THEME, THEME_STORAGE_KEY, type Theme} from "./theme"

interface SiteSettings {
    theme: Theme
    catStroll: boolean
    setTheme: (theme: Theme) => void
    setCatStroll: (on: boolean) => void
}

const SiteSettingsContext = createContext<SiteSettings | null>(null)

// `data-theme` on <html> is the source of truth; the init script sets it before React runs.
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}
const readTheme = (): Theme => document.documentElement.dataset.theme === "day" ? "day" : DEFAULT_THEME

export function SiteSettingsProvider({children}: { children: React.ReactNode }) {
    const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => DEFAULT_THEME)
    const [catStroll, setCatStroll] = useState(false)

    const setTheme = useCallback((next: Theme) => {
        document.documentElement.dataset.theme = next
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next)
        } catch {
            // storage blocked: the theme still applies for this visit
        }
        listeners.forEach(listener => listener())
    }, [])

    const value = useMemo(() => ({theme, catStroll, setTheme, setCatStroll}), [theme, catStroll, setTheme])

    return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
    const ctx = useContext(SiteSettingsContext)
    if (!ctx) throw new Error("useSiteSettings must be used inside SiteSettingsProvider")
    return ctx
}
