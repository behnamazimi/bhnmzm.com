import {Squiggle} from "./illustrations"

interface SectionHeadingProps {
    as?: "h1" | "h2"
    className?: string
    children: React.ReactNode
}

export function SectionHeading({as: Tag = "h2", className = "", children}: SectionHeadingProps) {
    return (
        <Tag className={`m-0 font-display text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] ${className}`}>
            {children}
            <Squiggle className="mt-1.5 block"/>
        </Tag>
    )
}
