const METAL = "#D9D4C7"

export function Clarinet({className = ""}: { className?: string }) {
    return (
        <svg className={`text-ink ${className}`} width="190" height="60" viewBox="0 0 204 64" aria-hidden="true">
            <path d="M5 30l15-5h20l2 1h106c22 0 38-1 51-7l-1 28c-13-6-29-7-51-7H40l-20 2z" className="fill-lavender" transform="translate(-3 -3)"/>

            <g fill="#2B2A38" stroke="currentColor" strokeLinejoin="round">
                <path d="M4 28.5l16-4.5v14l-16-4z" strokeWidth="2.2"/>
                <path d="M20 23c6-1 12-1 18 0v16c-6 1-12 1-18 0z" strokeWidth="2.2"/>
                <path d="M38 24.5h64v13H38z" strokeWidth="2.2"/>
                <path d="M106 24.5l40-.5v14l-40-.5z" strokeWidth="2.8"/>
                <path d="M148 24c22 0 38-1 51-7v28c-13-6-29-7-51-7z" strokeWidth="2.8"/>
            </g>
            <path d="M195 20c1.5 7 1.5 15 0 22" fill="none" stroke={METAL} strokeWidth="1.4" strokeLinecap="round" opacity=".6"/>
            <path d="M176 25l4-2M180 29l6-3M181 34l7-3M178 39l5-2" fill="none" className="stroke-lavender" strokeWidth="1.3" strokeLinecap="round"/>

            <path d="M5 35l17 4" fill="none" className="stroke-yellow" strokeWidth="2.5" strokeLinecap="round"/>
            <g fill={METAL} stroke="currentColor" strokeWidth="1.5">
                <rect x="12" y="24" width="6" height="15" rx="1.5"/>
                <rect x="101" y="22" width="6" height="18" rx="1.5"/>
                <rect x="144" y="22" width="5" height="18" rx="1.5"/>
            </g>
            <path d="M15 22.5v-2M15 40.5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>

            <path d="M46 27.5h52M110 27h34" fill="none" stroke={METAL} strokeWidth="1.5" strokeLinecap="round"/>
            <g fill="#2B2A38" stroke={METAL} strokeWidth="1.5">
                <circle cx="52" cy="32" r="3.2"/>
                <circle cx="64" cy="32" r="3.4"/>
                <circle cx="76.5" cy="32" r="3"/>
                <circle cx="114" cy="31.5" r="3.2"/>
                <circle cx="124" cy="31.5" r="3"/>
                <circle cx="134" cy="31.5" r="3.2"/>
            </g>
            <g fill={METAL}>
                <circle cx="52" cy="32" r="1"/>
                <circle cx="64" cy="32" r="1"/>
                <circle cx="114" cy="31.5" r="1"/>
                <circle cx="134" cy="31.5" r="1"/>
                <ellipse cx="90" cy="31" rx="3" ry="2"/>
                <ellipse cx="141" cy="31" rx="2.5" ry="1.8"/>
            </g>
            <path d="M82 36l8 5M134 36l6 4" fill="none" stroke={METAL} strokeWidth="1.6" strokeLinecap="round"/>

            <path d="M30 51l4-4M42 51l4-4M54 51l4-4M66 51l4-4M78 51l4-4M90 51l4-4M102 51l4-4M114 51l4-4M126 51l4-4M138 51l4-4M150 51l4-4" fill="none" className="stroke-accent" strokeWidth="1.4" strokeLinecap="round" opacity=".7"/>
        </svg>
    )
}
