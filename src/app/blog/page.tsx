import type {Metadata} from "next"
import {PostCard} from "@/components/PostCard"
import {SectionHeading} from "@/components/SectionHeading"
import {getAllPosts} from "@/lib/posts"
import {pageMetadata} from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
    title: "Writing",
    description: "Things Behnam Azimi has written about code, git and open source.",
    path: "/blog",
})

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <section className="mx-auto max-w-[1180px] px-8 pb-24 pt-10">
            <SectionHeading as="h1" className="mb-10">Things I&apos;ve written</SectionHeading>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-7">
                {posts.map(post => <PostCard key={post.slug} post={post} cover/>)}
            </div>
        </section>
    )
}
