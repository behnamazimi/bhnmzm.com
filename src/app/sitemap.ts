import type {MetadataRoute} from "next"
import {site} from "@/content/site"
import {getAllPosts} from "@/lib/posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts()
    const base = site.url

    return [
        {url: `${base}/`},
        {url: `${base}/blog`},
        ...posts.map(post => ({url: `${base}/blog/${post.slug}`, lastModified: post.updated_at || post.created_at})),
    ]
}
