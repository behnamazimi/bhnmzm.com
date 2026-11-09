import Link from "next/link"
import {nav} from "@/content/nav"
import {Logo} from "./Logo"
import {focusRing} from "./focus"

export function SiteHeader() {
    return (
        <header className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-8 py-[18px]">
            <Link href="/" className={`flex items-center gap-2.5 font-display text-[19px] font-bold text-ink no-underline hover:text-accent ${focusRing}`}>
                <Logo/>
                bhnmzm
            </Link>
            <nav aria-label="Main" className="flex flex-wrap gap-x-[26px] text-base">
                {nav.map(({href, label}) => (
                    <Link key={href} href={href} className={`group relative px-1 py-2.5 text-ink no-underline hover:text-accent ${focusRing}`}>
                        {label}
                        <span aria-hidden="true" className="absolute inset-x-1 bottom-1 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"/>
                    </Link>
                ))}
            </nav>
        </header>
    )
}
