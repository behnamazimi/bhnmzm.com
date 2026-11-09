import Link from "next/link"
import {focusRing} from "./focus"

const STYLE = `inline-flex min-h-11 items-center font-mono text-[15px] text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] hover:text-accent ${focusRing}`

interface TextLinkProps {
    href: string
    className?: string
    children: React.ReactNode
}

export function TextLink({href, className = "", children}: TextLinkProps) {
    const external = /^https?:/.test(href)

    return external
        ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${STYLE} ${className}`}>{children}</a>
        : <Link href={href} className={`${STYLE} ${className}`}>{children}</Link>
}
