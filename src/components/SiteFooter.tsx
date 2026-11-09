import Link from "next/link"
import {profile} from "@/content/profile"
import {nav} from "@/content/nav"
import {Handwritten} from "./Handwritten"
import {Logo} from "./Logo"
import {focusRing} from "./focus"

const LINK = `text-ink hover:text-accent ${focusRing}`

export function SiteFooter() {
    return (
        <footer className="border-t-2 border-ink">
            <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8 px-8 pb-6 pt-12">
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2.5 font-display text-xl font-bold">
                        <Logo/>
                        bhnmzm
                    </span>
                    <Handwritten className="text-2xl text-muted">Wishing you well :)</Handwritten>
                </div>
                <nav aria-label="This site" className="flex flex-col gap-1 text-[15px]">
                    <span className="mb-1.5 font-bold">This site</span>
                    {nav.map(({href, label}) => <Link key={href} href={href} className={LINK}>{label}</Link>)}
                </nav>
                <nav aria-label="Elsewhere" className="flex flex-col gap-1 text-[15px]">
                    <span className="mb-1.5 font-bold">Elsewhere</span>
                    {profile.socials.map(({id, label, href}) => <a key={id} href={href} target="_blank" rel="noopener noreferrer" className={LINK}>{label}</a>)}
                </nav>
            </div>
            <div className="mx-auto max-w-[1180px] border-t border-line px-8 pb-8 pt-4 font-mono text-[13px] text-muted">
                © {new Date().getFullYear()} {profile.name} · since 2021
            </div>
        </footer>
    )
}
