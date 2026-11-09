import {HALFTONE, Halftone} from "./Halftone"

export function MiyaSitting({awake = false, className = ""}: { awake?: boolean, className?: string }) {
    return (
        <svg className={`text-ink ${className}`} width="124" height="134" viewBox="0 0 124 134" aria-hidden="true">
            <Halftone/>

            {/* tint sits slightly off-register from the ink, like a two-pass print */}
            <g className="fill-peach" transform="translate(-3 -2)">
                <path d="M41 64C27 78 21 100 25 116c3 10 14 14 26 13h30c11 0 17-9 17-23 0-18-8-32-16-42z"/>
                <path d="M31 41c0-18 23-24 39-21 18 3 28 17 24 33-4 16-24 21-40 19-16-2-23-14-23-31z"/>
                <path d="M37 34 34 8l19 15zM72 23l18-13 1 23z"/>
                <path d="M88 126C104 127 116 120 117 106c1-9-5-15-11-13-4 1-5 6-1 7 4-1 6 2 6 6-1 10-9 15-21 15z"/>
            </g>
            <path d="M44 70c10 6 26 6 38-2 2 6-12 12-26 12-8 0-12-4-12-10zM84 72c10 14 12 32 8 46-4 6-8 8-12 9 8-15 8-37 4-55zM40 60c4 6 12 9 20 10-10 2-18-2-20-10z" fill={HALFTONE}/>
            <path d="M111 106c0 10-8 15-20 15l-1 4c14 0 24-7 25-19z" fill={HALFTONE}/>

            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M41 66C31 76 25 92 26 108c1 12 8 18 19 19" strokeWidth="2.2"/>
                <path d="M82 66c10 10 16 26 14 44-1 10-6 16-15 17" strokeWidth="3"/>
                <path d="M37 33c-3-9-5-18-3-25 8 4 14 10 18 14 6-2 14-2 20 0 5-5 11-10 18-12 1 5 0 7 1 7l-3 2 3 3c0 5-1 9-2 13 4 6 6 12 4 16l4 4-6 1 3 5c-7 6-19 10-31 10-12 0-24-4-30-10l3-3-6-3 4-3c-4-6-2-13 4-19" strokeWidth="2.4"/>
                <path d="M86 126C104 127 116 120 117 106c1-9-5-15-11-13-4 1-5 6-1 7 4-1 6 2 6 6-1 10-9 15-21 15" strokeWidth="2.6"/>
                <path d="M48 127c-2-6 2-10 7-9 5-1 7 4 6 9M63 127c-1-6 3-9 8-8 4 0 6 4 5 8" strokeWidth="2.2"/>
                <path d="M48 55c-8-2-18-3-26-2M48 58c-8 0-16 2-24 4M49 61c-6 1-12 4-17 7M75 53c8-3 18-5 26-4M75 56c9-1 17 0 24 3M74 59c6 2 12 5 16 8" strokeWidth="1.2"/>
            </g>

            <g fill="none" className="stroke-ink-fixed" strokeLinecap="round" strokeLinejoin="round">
                <path d="M52 92c-1 10-2 18-2 27M70 92c1 10 2 18 2 28" strokeWidth="2"/>
                <path d="M52 123v3M56 123v3M67 123v3M71 123v2.5" strokeWidth="1.3"/>
                <path d="M54 26l2 6M61 25v7.5M68 27l-1.5 4.5" strokeWidth="2"/>
                <path d="M35 47l6 1M34 52h5M89 45l-6 1.5M90 50l-5 .5" strokeWidth="1.6"/>
                <path d="M56 76q2 3 0 6M62 77q2 3 0 6M68 76q2 3 0 6" strokeWidth="1.4"/>
                <path d="M109 114l5 3M111 105h6M100 121l1 5" strokeWidth="2.2"/>
            </g>

            <path d="M40 17l3 10 6-4zM86 17l-1 9-6-2z" className="fill-pink"/>
            <path d="M58 52.5l6.5-.5-3 3.8z" className="fill-ink-fixed"/>
            <path d="M61.5 56q-2 3.5-6.5 2M61.5 56q2.5 3 6.5 1.5" fill="none" className="stroke-ink-fixed" strokeWidth="1.6" strokeLinecap="round"/>

            {awake ? (
                <g>
                    <path d="M45 46q5.5-6.5 11 0q-5.5 5-11 0zM67 44.5q5.5-6.5 11 0q-5.5 5-11 0z" className="fill-eye-green stroke-ink-fixed" strokeWidth="1.8"/>
                    <path d="M50.5 42.5v7M72.5 41v7" className="stroke-ink-fixed" strokeWidth="2.2" strokeLinecap="round"/>
                    <circle cx="52.5" cy="44.5" r=".9" fill="#fff"/>
                    <circle cx="74.5" cy="43" r=".9" fill="#fff"/>
                </g>
            ) : (
                <>
                    <path d="M45 46q5.5 4 11-.5M67 44.5q5.5 4 11-.5" fill="none" className="stroke-ink-fixed" strokeWidth="2.2" strokeLinecap="round"/>
                    <text x="92" y="22" fontSize="20" className="fill-accent font-hand font-bold">z z</text>
                </>
            )}

            <path d="M28 132l5-4M36 133l6-5M45 133l6-5M54 133l6-5M63 133l6-5M72 133l6-5M81 133l6-5M90 133l5-4M99 132l4-3" fill="none" className="stroke-accent" strokeWidth="1.4" strokeLinecap="round" opacity=".7"/>
        </svg>
    )
}
