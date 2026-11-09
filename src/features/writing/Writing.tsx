import {PostCard} from "@/components/PostCard"
import {SectionHeading} from "@/components/SectionHeading"
import {TextLink} from "@/components/TextLink"
import {getAllPosts} from "@/lib/posts"

export async function Writing() {
    const latest = (await getAllPosts()).slice(0, 3)

    return (
        <section id="writing" className="mx-auto flex max-w-[1180px] flex-col gap-9 px-8 pb-[104px] pt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading>Things I&apos;ve written</SectionHeading>
                <TextLink href="/blog" className="font-sans text-base font-semibold">All writing →</TextLink>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7">
                {latest.map(post => <PostCard key={post.slug} post={post}/>)}
            </div>
        </section>
    )
}
