import {proxyNotes} from "@/content/proxy-notes"
import {NotesRelay} from "./NotesRelay"

export function Proxy() {
    return (
        <section id="proxy" className="mx-auto max-w-[1180px] px-8 py-[104px]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-x-[72px] gap-y-7">
                <div className="flex flex-col gap-5">
                    <span className="font-mono text-[13px] text-muted">proxy-dev (n.)</span>
                    <blockquote className="m-0 font-display text-[clamp(34px,4.2vw,54px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                        “Either use AI or get replaced by it. <span className="text-accent">Don&apos;t overthink it.</span>”
                    </blockquote>
                </div>
                <p className="m-0 text-muted">
                    That&apos;s me these days: a proxy-dev. I sit between AI agents and pass their notes along. I read every one, fix the ones that need fixing, and still take the blame.
                </p>
            </div>
            <NotesRelay notes={proxyNotes}/>
        </section>
    )
}
