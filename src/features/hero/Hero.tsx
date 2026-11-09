import {TextLink} from "@/components/TextLink"
import {profile} from "@/content/profile"
import {Desk} from "./Desk"

const HERO_LINKS = ["github", "x", "linkedin"]

export function Hero() {
    const links = profile.socials.filter(s => HERO_LINKS.includes(s.id))

    return (
        <section id="home" className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-10 px-8 pb-20 pt-10">
            <div className="relative z-[1] flex flex-col gap-[18px]">
                <span className="text-xl text-muted">Hi, I&apos;m</span>
                <h1 className="-mt-2 mb-0 font-display text-[clamp(52px,7vw,92px)] font-extrabold leading-[.95] tracking-[-0.035em] text-accent">{profile.name}</h1>
                <p className="m-0 text-2xl font-semibold leading-[1.35]">A {profile.role} from {profile.city}.</p>
                <p className="m-0 max-w-[470px] text-muted">
                    I build things for the browser and the tools around it. Life comes in three Cs: Miya the cat, code, and the clarinet.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3.5">
                    {links.map((s, i) => (
                        <span key={s.id} className="contents">
                            {i > 0 && <span aria-hidden="true" className="text-muted">/</span>}
                            <TextLink href={s.href}>{s.id}</TextLink>
                        </span>
                    ))}
                </div>
            </div>
            <Desk/>
        </section>
    )
}
