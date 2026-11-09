import "server-only"
import path from "path"
import {promises as fs} from "fs"
import matter from "gray-matter"
import {markdownToHtml} from "./markdown"

export interface PostMeta {
    slug: string
    title: string
    description: string
    created_at: string
    updated_at?: string
    image?: string
    order: number
}

export interface Post extends PostMeta {
    html: string
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts")

// YAML parses unquoted dates into Date objects; empty strings mean "not set".
const asDateString = (value: unknown) => value instanceof Date ? value.toISOString() : (value || undefined) as string | undefined

async function readPost(slug: string, dir: string) {
    const raw = await fs.readFile(path.join(dir, `${slug}.md`), "utf8")
    const {data, content} = matter(raw)

    const meta: PostMeta = {
        slug,
        title: data.title,
        description: data.description,
        created_at: asDateString(data.created_at) as string,
        updated_at: asDateString(data.updated_at),
        image: data.image || undefined,
        order: data.order,
    }

    return {meta, content}
}

export async function getPost(slug: string, dir = POSTS_DIR): Promise<Post> {
    const {meta, content} = await readPost(slug, dir)
    return {...meta, html: await markdownToHtml(content)}
}

export async function getAllPosts(dir = POSTS_DIR): Promise<PostMeta[]> {
    const files = await fs.readdir(dir)
    const posts = await Promise.all(
        files.filter(file => file.endsWith(".md")).map(async file => (await readPost(file.slice(0, -3), dir)).meta)
    )

    return posts.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
}
