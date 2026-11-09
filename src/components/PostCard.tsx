import Image from "next/image"
import type {PostMeta} from "@/lib/posts"
import {Card} from "./Card"

export function PostCard({post, cover = false}: {post: PostMeta, cover?: boolean}) {
    return (
        <Card href={`/blog/${post.slug}`} className="flex h-full flex-col overflow-hidden">
            {cover && post.image && (
                <div className="relative aspect-[16/9] border-b-2 border-ink bg-sunk">
                    <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover"/>
                </div>
            )}
            <div className="flex flex-col gap-2.5 p-6">
                <span className="font-mono text-xs text-muted">{new Date(post.created_at).getUTCFullYear()}</span>
                <span className="font-display text-[22px] font-bold leading-[1.25]">{post.title}</span>
                <span className="text-base text-muted">{post.description}</span>
            </div>
        </Card>
    )
}
