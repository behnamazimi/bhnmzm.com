import {SectionHeading} from "@/components/SectionHeading"
import {projects} from "@/content/projects"
import {LsListing} from "./LsListing"

export function Projects() {
    return (
        <section id="work">
            <div className="mx-auto max-w-[1180px] px-8 pb-20 pt-[88px]">
                <div className="mb-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
                    <SectionHeading>Things I&apos;ve made</SectionHeading>
                    <p className="m-0 max-w-[420px] text-muted">Built for myself first, published later. Open one to read its README.</p>
                </div>
                <LsListing projects={projects}/>
            </div>
        </section>
    )
}
