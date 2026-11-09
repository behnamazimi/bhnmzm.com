export type Theme = "day" | "night"

export const THEME_STORAGE_KEY = "theme"

// Runs inline before first paint so the page never flashes the wrong theme.
export const DEFAULT_THEME: Theme = "night"

export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="day"||t==="night"?t:"${DEFAULT_THEME}"}catch(e){}`
