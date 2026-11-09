import {About} from "@/features/about/About"
import {Hero} from "@/features/hero/Hero"
import {Projects} from "@/features/projects/Projects"
import {Proxy} from "@/features/proxy/Proxy"
import {Writing} from "@/features/writing/Writing"

export default function HomePage() {
    return (
        <>
            <Hero/>
            <About/>
            <Projects/>
            <Proxy/>
            <Writing/>
        </>
    )
}
