import {mkdtemp, writeFile} from "fs/promises"
import os from "os"
import path from "path"
import {beforeAll, describe, expect, it, vi} from "vitest"
import {getAllPosts, getPost} from "./posts"

vi.mock("server-only", () => ({}))

let dir: string

const post = (fields: string, body = "Hello **world**") => `---\n${fields}\n---\n\n${body}\n`

beforeAll(async () => {
  dir = await mkdtemp(path.join(os.tmpdir(), "posts-"))
  await writeFile(path.join(dir, "older.md"), post(
    "title: Older\ndescription: An old post\norder: 1\ncreated_at: '2021-01-01T00:00:00.000Z'\nupdated_at: ''"
  ))
  await writeFile(path.join(dir, "newer.md"), post(
    "title: Newer\ndescription: A new post\norder: 2\ncreated_at: '2022-06-01T00:00:00.000Z'\nupdated_at: '2022-07-01T00:00:00.000Z'\nimage: 'https://example.com/a.png'",
    "| a | b |\n|---|---|\n| 1 | 2 |"
  ))
  await writeFile(path.join(dir, "notes.txt"), "not a post")
})

describe("getAllPosts", () => {
  it("derives slugs from file names and ignores non-markdown files", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.map(p => p.slug).sort()).toEqual(["newer", "older"])
  })

  it("sorts by created_at descending", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.map(p => p.slug)).toEqual(["newer", "older"])
  })

  it("does not render html for the list", async () => {
    const [first] = await getAllPosts(dir)
    expect(first).not.toHaveProperty("html")
  })

  it("leaves image undefined when the post has none", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.find(p => p.slug === "older")?.image).toBeUndefined()
    expect(posts.find(p => p.slug === "newer")?.image).toBe("https://example.com/a.png")
  })

  it("treats an empty updated_at as unset", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.find(p => p.slug === "older")?.updated_at).toBeUndefined()
    expect(posts.find(p => p.slug === "newer")?.updated_at).toBe("2022-07-01T00:00:00.000Z")
  })

  it("parses every real post", async () => {
    const posts = await getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
    for (const p of posts) {
      expect(p.title).toBeTruthy()
      expect(Number.isNaN(Date.parse(p.created_at))).toBe(false)
    }
  })
})

describe("getPost", () => {
  it("renders the requested post to html", async () => {
    const p = await getPost("older", dir)
    expect(p.title).toBe("Older")
    expect(p.html).toContain("<strong>world</strong>")
  })

  it("supports GFM tables", async () => {
    const p = await getPost("newer", dir)
    expect(p.html).toContain("<table>")
  })

  it("opens external links in a new tab and leaves internal ones alone", async () => {
    await writeFile(path.join(dir, "links.md"), post("title: Links\ndescription: d\norder: 3\ncreated_at: '2023-01-01T00:00:00.000Z'", "[out](https://example.com) and [in](/blog)"))
    const p = await getPost("links", dir)
    expect(p.html).toContain('<a href="https://example.com" target="_blank" rel="noopener noreferrer">out</a>')
    expect(p.html).toContain('<a href="/blog">in</a>')
  })

  it("rejects for an unknown slug", async () => {
    await expect(getPost("missing", dir)).rejects.toThrow()
  })
})
