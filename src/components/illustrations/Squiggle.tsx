export function Squiggle({className = ""}: { className?: string }) {
    return (
        <svg className={className} width="200" height="14" viewBox="0 0 200 14" aria-hidden="true">
            <path d="M4 7c30-5 64-7 96-3s68 3 94-3" fill="none" strokeWidth="3.5" strokeLinecap="round" className="stroke-lavender"/>
            <path d="M3 9c34-6 66-6 98-2s66 2 96-4" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-accent"/>
        </svg>
    )
}
