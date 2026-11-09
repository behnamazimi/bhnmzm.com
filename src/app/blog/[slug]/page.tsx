import type {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"
import {Prose} from "@/components/Prose"
import {focusRing} from "@/components/focus"
import {formatDate} from "@/lib/dates"
import {pageMetadata} from "@/lib/metadata"
import {getAllPosts, getPost} from "@/lib/posts"

type Props = {params: Promise<{slug: string}>}

export const dynamicParams = false

export async function generateStaticParams() {
    return (await getAllPosts()).map(post => ({slug: post.slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params
    const post = await getPost(slug)
    return pageMetadata({title: post.title, description: post.description, path: `/blog/${slug}`, image: post.image})
}

export default async function BlogPostPage({params}: Props) {
    const {slug} = await params
    const post = await getPost(slug)

    return (
        <article className="mx-auto max-w-[680px] px-8 pb-24 pt-10">
            <header className="mb-10 flex flex-col gap-4">
                <h1 className="m-0 font-display text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em]">{post.title}</h1>
                <p className="m-0 font-mono text-[13px] text-muted">
                    {formatDate(post.created_at)}
                    {post.updated_at && <> · updated {formatDate(post.updated_at)}</>}
                </p>
                {post.image && (
                    <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-[14px] border-2 border-ink bg-sunk shadow-[5px_5px_0_var(--color-ink)]">
                        <Image src={post.image} alt="" fill priority sizes="(min-width: 768px) 616px, 100vw" className="object-cover"/>
                    </div>
                )}
            </header>
            <Prose html={post.html}/>
            <Link href="/blog" className={`mt-12 inline-flex min-h-11 items-center font-semibold text-ink hover:text-accent ${focusRing}`}>← all writing</Link>
        </article>
    )
}
