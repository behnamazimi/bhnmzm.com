// Kept in sync by hand with docs/design/logo.svg, the source for the app icons.
const TILE = "M9.5 5.5c7-.6 14-.5 21 0 2.6.2 4 1.6 4.2 4.2.5 7 .4 14 0 21-.2 2.6-1.6 4-4.2 4.2-7 .5-14 .4-21 0-2.6-.2-4-1.6-4.2-4.2-.4-7-.5-14 0-21 .2-2.6 1.6-4 4.2-4.2z"
const LETTERS = "M11 12.5v15.5M11 12.5h3.8c2.3 0 3.7 1.4 3.7 3.6s-1.4 3.7-3.7 3.7H11M11 19.8h4.3c2.6 0 4 1.6 4 4.1S17.9 28 15.3 28H11M22 28l3.9-15.6 4.1 15.6M23.4 23.2h5.3"

/** The BA mark, in the same off-register print style as the illustrations. */
export function Logo({size = 28, className = ""}: {size?: number, className?: string}) {
    return (
        <svg className={`shrink-0 text-ink ${className}`} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
            <path d={TILE} className="fill-orange" transform="translate(-1.5 -1)"/>
            <path d="M24 33l3.5-3.5M28 33l2.5-2.5" fill="none" className="stroke-ink-fixed" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
            <path d={TILE} fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 9.5c1.5-1 3.5-1.4 5.5-1.4" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".7"/>
            <path d={LETTERS} fill="none" className="stroke-ink-fixed" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
