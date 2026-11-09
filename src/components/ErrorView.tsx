import {Handwritten} from "./Handwritten"
import {MiyaSitting} from "./illustrations"

interface ErrorViewProps {
    title: string
    message: string
    children?: React.ReactNode
}

export function ErrorView({title, message, children}: ErrorViewProps) {
    return (
        <section className="mx-auto flex max-w-[680px] flex-col items-start gap-5 px-8 pb-28 pt-16">
            <MiyaSitting/>
            <h1 className="m-0 font-display text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em]">{title}</h1>
            <p className="m-0 text-muted">{message}</p>
            <Handwritten className="text-2xl text-muted">Miya is asleep. She did not see anything.</Handwritten>
            {children}
        </section>
    )
}
