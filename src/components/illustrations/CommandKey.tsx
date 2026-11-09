import {HALFTONE, Halftone} from "./Halftone"

export function CommandKey({pressed = false, className = ""}: { pressed?: boolean, className?: string }) {
    return (
        <svg className={`text-ink ${className}`} width="92" height="92" viewBox="0 0 120 120" aria-hidden="true">
            <Halftone/>

            <path d="M20 26c0-3 2-5 5-5h69c3 0 5 2 6 5l2 71c0 3-2 5-5 5H23c-3 0-5-2-5-5z" className="fill-peach" transform="translate(-3 -2)"/>
            <path d="M24 86h74l2 12c0 2-1 3-3 3H23c-2 0-3-1-3-3z" fill={HALFTONE}/>
            <path d="M20 26c0-3 2-5 5-5h69c3 0 5 2 6 5l2 71c0 3-2 5-5 5H23c-3 0-5-2-5-5z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"/>

            <g transform={pressed ? "translate(0 6)" : undefined}>
                <path d="M32 28h56c3 0 5 2 5 4l-1 45c0 3-2 5-5 5H33c-3 0-5-2-5-5l-1-45c0-2 2-4 5-4z" fill="#FDE3D6" className="stroke-ink-fixed" strokeWidth="2.4" strokeLinejoin="round"/>
                <path d="M36 33c10-1 30-1 44 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
                <g fill="none" className="stroke-ink-fixed" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M54 49h12.5v12H54z"/>
                    <path d="M54 49v-3a4.5 4.5 0 1 0-4.5 4.5H54M66.5 49v-3a4.5 4.5 0 1 1 4.5 4.5h-4.5M54 61v3a4.5 4.5 0 1 1-4.5-4.5H54M66.5 61v3a4.5 4.5 0 1 0 4.5-4.5h-4.5"/>
                </g>
            </g>

            <path d="M24 111l5-4M34 112l6-5M45 112l6-5M56 112l6-5M67 112l6-5M78 112l6-5M89 111l5-4" fill="none" className="stroke-accent" strokeWidth="1.4" strokeLinecap="round" opacity=".7"/>
        </svg>
    )
}
