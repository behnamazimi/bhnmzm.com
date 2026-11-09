import Link from "next/link"
import {focusRing} from "./focus"

const BASE = "block rounded-[14px] border-2 border-ink bg-card text-ink shadow-[5px_5px_0_var(--color-ink)] transition-[transform,box-shadow,background-color] duration-200"
const LIFT = "no-underline hover:-translate-x-[3px] hover:-translate-y-[3px] hover:text-ink hover:shadow-[8px_8px_0_var(--color-ink)]"

interface CardProps {
    href?: string
    className?: string
    children: React.ReactNode
}

export function Card({href, className = "", children}: CardProps) {
    if (href) {
        return <Link href={href} className={`${BASE} ${LIFT} ${focusRing} ${className}`}>{children}</Link>
    }

    return <div className={`${BASE} ${className}`}>{children}</div>
}
