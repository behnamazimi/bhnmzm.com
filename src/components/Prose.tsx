// Tailwind Typography, with its colors pointed at the theme tokens so day and night both work.
const PROSE = [
    "prose max-w-none",
    "[--tw-prose-body:var(--color-ink)] [--tw-prose-headings:var(--color-ink)] [--tw-prose-lead:var(--color-muted)]",
    "[--tw-prose-links:var(--color-accent)] [--tw-prose-bold:var(--color-ink)] [--tw-prose-counters:var(--color-muted)]",
    "[--tw-prose-bullets:var(--color-muted)] [--tw-prose-hr:var(--color-line)] [--tw-prose-quotes:var(--color-ink)]",
    "[--tw-prose-quote-borders:var(--color-accent)] [--tw-prose-captions:var(--color-muted)] [--tw-prose-code:var(--color-ink)]",
    "[--tw-prose-pre-code:var(--color-term)] [--tw-prose-pre-bg:var(--color-code)]",
    "[--tw-prose-th-borders:var(--color-line)] [--tw-prose-td-borders:var(--color-line)]",
    "text-[18px] leading-[1.7] prose-headings:font-display prose-headings:tracking-[-0.02em]",
    "prose-code:rounded prose-code:bg-sunk prose-code:px-1 prose-code:font-mono prose-code:text-[.9em] prose-code:before:content-none prose-code:after:content-none",
    "prose-pre:border-2 prose-pre:border-ink prose-pre:font-mono prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0",
    "prose-img:rounded-[14px] prose-img:border-2 prose-img:border-ink",
].join(" ")

export function Prose({html}: {html: string}) {
    return <div className={PROSE} dangerouslySetInnerHTML={{__html: html}}/>
}
