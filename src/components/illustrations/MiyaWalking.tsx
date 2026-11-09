import {HALFTONE, Halftone} from "./Halftone"

const LEG = "animate-legs origin-top [transform-box:fill-box]"
const LEG_REVERSE = `${LEG} [animation-direction:alternate-reverse]`
const LEGS = [[44, LEG], [56, LEG_REVERSE], [92, LEG_REVERSE], [104, LEG]] as const
const HEAD = "M106 30c-2-7-3-14-2-19 6 3 10 7 13 10 4-1 8-1 11 0 2-4 5-8 8-11 2 5 2 9 1 14l-2 1 2 3c3 4 4 9 2 13l4 3-5 1 1 4c-5 4-12 6-19 5-8-1-14-6-16-12l-4-1 4-2c-1-4 0-7 2-10z"

export function MiyaWalking({className = ""}: { className?: string }) {
    return (
        <svg className={`text-ink ${className}`} width="150" height="100" viewBox="0 0 150 100" aria-hidden="true">
            <Halftone/>

            <g className="fill-peach" transform="translate(-3 -2)">
                <path d="M30 50c0-12 14-16 30-16h36c12 0 18 8 18 18s-8 14-18 14H46c-10 0-16-6-16-16z"/>
                <path d="M103 38c0-12 8-18 18-18s18 6 18 17-8 17-18 17-18-5-18-16zM106 30l-2-19 13 10zM125 21l11-11 1 15z"/>
            </g>
            <path d="M38 60c10 5 34 6 60 4 6 0 10-3 12-6-2 6-8 9-16 9-16 1-36 1-48 0-4-1-7-3-8-7z" fill={HALFTONE}/>

            <path d="M32 47c-13-5-19-19-13-31 2-4 6-5 8-2" fill="none" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round"/>
            <path d="M32 47c-13-5-19-19-13-31 2-4 6-5 8-2" fill="none" className="stroke-peach" strokeWidth="3" strokeLinecap="round"/>
            <path d="M18 35l6-2M16 26l6 1" fill="none" className="stroke-ink-fixed" strokeWidth="1.8" strokeLinecap="round"/>

            {LEGS.map(([x, motion]) => (
                <g key={x} className={motion} fill="none" strokeLinecap="round">
                    <path d={`M${x} 64v14c0 2 2 4 5 4`} stroke="currentColor" strokeWidth="7"/>
                    <path d={`M${x} 64v14c0 2 2 4 5 4`} className="stroke-peach" strokeWidth="2.5"/>
                </g>
            ))}
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 50c0-11 13-16 29-16 12 0 24 1 36-1 12-1 19 8 19 18 0 9-7 14-17 14-14 1-34 2-50 1-11 0-17-6-17-16z" strokeWidth="2.5"/>
            </g>
            <path d="M62 34l3 7M73 34l2 7.5M84 34l1 5" fill="none" className="stroke-ink-fixed" strokeWidth="2" strokeLinecap="round"/>

            <path d={HEAD} className="fill-peach"/>
            <path d={HEAD} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M107 15l1 8 5-3zM133 14l-1 7-4-2z" className="fill-pink"/>
            <path d="M116 24l1 4M121 23v4.5M110 42l5 1" fill="none" className="stroke-ink-fixed" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M122 36q4-5 8 0q-4 4-8 0z" className="fill-eye-green stroke-ink-fixed" strokeWidth="1.6"/>
            <path d="M126 33.5v5" className="stroke-ink-fixed" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M134 43l4-.5-2 3z" className="fill-ink-fixed"/>
            <path d="M136 46q-1 2.5-3.5 2" fill="none" className="stroke-ink-fixed" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M135 46c5-2 10-2 14-1M135 49c5 0 9 2 13 4M134 51c3 2 6 4 8 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
    )
}
