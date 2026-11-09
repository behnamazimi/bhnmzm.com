export interface Project {
  slug: string
  name: string
  /** one line, shown in the row and at the top of the README */
  pitch: string
  kind: "app" | "cli" | "extension" | "library"
  status: "active" | "maintained" | "archived"
  /** year of the first commit */
  since: number
  stack?: string[]
  /** GitHub stars, a snapshot from 2026-11; refresh by hand */
  stars?: number
  /** a number worth showing, e.g. "20K+ users" */
  highlight?: string
  links: {site?: string, source?: string, store?: string}
}

export const projects: Project[] = [
  {
    slug: "playmime", name: "Playmime", kind: "app", status: "active", since: 2025, stars: 10, highlight: "2K+ unique visits per month",
    pitch: "Charades with no pen, no paper and no hundred apps. Open it, get a word, act it out.",
    links: {site: "https://playmime.com", source: "https://github.com/behnamazimi/playmime.com"},
  },
  {
    slug: "knots", name: "Knots", kind: "app", status: "active", since: 2026, stars: 68, stack: ["TypeScript"],
    pitch: "Knots made easy.",
    links: {site: "https://knots-made-easy.pages.dev", source: "https://github.com/behnamazimi/knots"},
  },
  {
    slug: "zoyla", name: "Zoyla", kind: "app", status: "active", since: 2025, stars: 44, stack: ["Rust", "TypeScript"],
    pitch: "A fast, lightweight HTTP load testing app built with Rust.",
    links: {site: "https://zoyla.app", source: "https://github.com/behnamazimi/zoyla"},
  },
  {
    slug: "merriam-webster-extension", name: "Merriam-Webster extension", kind: "extension", status: "active", since: 2022, stars: 43,
    stack: ["TypeScript"], highlight: "20K+ users",
    pitch: "An open-source Merriam-Webster dictionary extension for Chromium browsers.",
    links: {
      store: "https://chrome.google.com/webstore/detail/merriam-webster-dictionar/gmhgdiamihghcepkeapfoeakphffcdkk",
      source: "https://github.com/behnamazimi/merriam-webster-dictionary-extension",
    },
  },
  {
    slug: "practical-front-end-projects", name: "Practical front-end projects", kind: "library", status: "maintained", since: 2020, stars: 617,
    stack: ["JavaScript", "CSS", "HTML"],
    pitch: "Small projects in plain JavaScript, CSS and HTML. Free to learn from, always.",
    links: {source: "https://github.com/behnamazimi/practical-front-end-projects"},
  },
  {
    slug: "sureyoudo", name: "SureYouDo", kind: "app", status: "active", since: 2024, stars: 15,
    pitch: "A trustless app where you lock in a pledge on your goal, and lose it if you give up.",
    links: {site: "https://sureyoudo.io", source: "https://github.com/sureyoudo-io"},
  },
  {
    slug: "in-site-shortkeys", name: "In-site shortkeys", kind: "extension", status: "maintained", since: 2020, stars: 15,
    stack: ["JavaScript"],
    pitch: "Define your own keyboard shortcuts for things you do often on websites.",
    links: {
      store: "https://chrome.google.com/webstore/detail/in-site-shortkeys/dgigbgdgmhhncfgaidcbmafkcmagkool",
      source: "https://github.com/behnamazimi/keyboard-shortcuts-for-websites",
    },
  },
  {
    slug: "icport", name: "icport", kind: "cli", status: "active", since: 2025, stars: 14, stack: ["TypeScript"],
    pitch: "Kill ports like a boss.",
    links: {source: "https://github.com/behnamazimi/icport"},
  },
  {
    slug: "visnap", name: "visnap", kind: "library", status: "active", since: 2025, stars: 3, stack: ["TypeScript"],
    pitch: "Visual regression testing for web apps, with Storybook and Playwright built in.",
    links: {site: "https://visnap.dev", source: "https://github.com/behnamazimi/visnap"},
  },
  {
    slug: "js-service-wrapper", name: "js-service-wrapper", kind: "library", status: "archived", since: 2020, stars: 9, stack: ["JavaScript"],
    pitch: "A promise-based service wrapper with a queue, for the browser and Node.js. Retired, with honors.",
    links: {source: "https://github.com/behnamazimi/js-service-wrapper"},
  },
]
