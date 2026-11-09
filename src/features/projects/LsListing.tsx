"use client"

import {useState} from "react"
import {Card} from "@/components/Card"
import {TextLink} from "@/components/TextLink"
import {focusRing} from "@/components/focus"
import type {Project} from "@/content/projects"

const LINK_LABELS = {site: "website", store: "chrome web store", source: "source"} as const

export function LsListing({projects}: {projects: Project[]}) {
    // The first project starts open.
    const [open, setOpen] = useState<number | null>(0)

    return (
        <Card className="overflow-hidden">
            <div className="border-b-2 border-ink bg-sunk px-5 py-3.5 transition-colors duration-500">
                <code className="font-mono text-[15px]"><span className="text-orange">$</span> ls ~/projects</code>
            </div>
            <div className="font-mono text-sm">
                {projects.map((p, i) => {
                    const expanded = open === i
                    return (
                        <div key={p.slug} className={`border-b border-line last:border-b-0 transition-colors duration-200 ${expanded ? "bg-sunk shadow-[inset_3px_0_0_var(--color-accent)]" : ""}`}>
                            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : i)}
                                    className={`grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-0.5 border-0 bg-transparent px-5 py-3 text-left font-[inherit] text-ink transition-colors duration-200 hover:bg-sunk sm:grid-cols-[64px_minmax(0,290px)_minmax(0,1fr)_48px] ${focusRing} focus-visible:-outline-offset-4`}>
                                <span className="order-2 text-muted sm:order-none">{p.stars ? `★ ${p.stars}` : "—"}</span>
                                <span className="order-1 truncate font-medium text-accent sm:order-none">
                                    {p.slug}/{p.status === "archived" && <span className="ml-2 font-normal text-muted"># archived</span>}
                                </span>
                                <span className="order-3 col-span-2 truncate text-muted sm:order-none sm:col-span-1">{p.pitch}</span>
                                <span className="hidden text-right text-muted sm:order-none sm:block">{p.since}</span>
                            </button>
                            {expanded && (
                                <div className="mx-5 animate-fade border-t border-dashed border-line pb-5 pt-4 font-sans sm:ml-[100px]">
                                    <div className="font-mono text-xs text-muted">{p.slug}/README.md</div>
                                    <div className="mb-2 mt-1.5 font-display text-[26px] font-extrabold leading-[1.15]"># {p.name}</div>
                                    <p className="m-0 mb-2.5 max-w-[640px] text-base text-muted">{p.pitch}</p>
                                    <p className="m-0 mb-2.5 font-mono text-xs text-muted">
                                        {[p.kind, `since ${p.since}`, p.status, p.highlight, ...(p.stack ?? [])].filter(Boolean).join(" · ")}
                                    </p>
                                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                                        {(Object.keys(LINK_LABELS) as (keyof typeof LINK_LABELS)[]).filter(k => p.links[k]).map(k => (
                                            <TextLink key={k} href={p.links[k]!}>{LINK_LABELS[k]} ↗</TextLink>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
