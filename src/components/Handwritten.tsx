interface HandwrittenProps {
    className?: string
    decorative?: boolean
    children: React.ReactNode
}

export function Handwritten({className = "", decorative = false, children}: HandwrittenProps) {
    return (
        <span className={`font-hand font-semibold leading-[1.1] ${className}`} aria-hidden={decorative || undefined}>
            {children}
        </span>
    )
}
