import {HALFTONE, Halftone} from "./Halftone"

export function RedPen({writing = false, className = ""}: { writing?: boolean, className?: string }) {
    return (
        <svg className={`block origin-[30%_80%] text-ink ${writing ? "animate-scribble" : ""} ${className}`} width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
            <Halftone/>
            <path d="M29 9c0-2 1-3 3-3h6c2 0 3 1 3 3v41H29z" className="fill-orange" transform="translate(-1.5 -1) rotate(40 35 35)"/>
            <g transform="rotate(40 35 35)">
                <path d="M37 15h4v35h-4z" fill={HALFTONE}/>
                <path d="M29 9c0-2 1-3 3-3h6c2 0 3 1 3 3v41H29z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M29 14.5h12" stroke="currentColor" strokeWidth="2"/>
                <path d="M39 8v16c0 1-1 2-2 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M30.5 42h9M30.5 45h9" className="stroke-ink-fixed" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M29 50l6 12 6-12z" className="fill-card" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M33.5 58l1.5 4 1.5-4z" className="fill-red-pen"/>
            </g>
        </svg>
    )
}
