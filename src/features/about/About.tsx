import {SectionHeading} from "@/components/SectionHeading"
import {Playground} from "./Playground"

export function About() {
    return (
        <section id="about" className="mx-auto grid max-w-[1180px] grid-cols-1 gap-x-[72px] gap-y-14 px-8 pb-28 pt-6 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-[18px] lg:pt-16">
                <SectionHeading>A bit about me</SectionHeading>
                <p className="m-0 text-muted">
                    Hey there, I&apos;m Behnam. I&apos;ve spent a good part of my life behind a screen, probing, investigating, and learning new things. These days I write mostly JavaScript and TypeScript, with simple scripts in Go and Python.
                </p>
                <p className="m-0 text-muted">
                    I love reading, I play the clarinet, and Miya keeps me company. I think geographical borders are meaningless. What matters is humanity.
                </p>
            </div>
            <div className="lg:order-first">
                <Playground/>
            </div>
        </section>
    )
}
