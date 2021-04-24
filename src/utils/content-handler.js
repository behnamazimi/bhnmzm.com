import path from "path";
import {promises as fs} from "fs";
import matter from "gray-matter";
import markdownToHtml from "./markdown-to-html";

function checkExtension(filename, ext) {
    const tmp = filename.split(".")
    return tmp && tmp.length && tmp[tmp.length - 1] === ext
}

export async function getContent(filename, type, fields = []) {
    const filePath = path.join(process.cwd(), 'src/contents', type, filename)
    const raw = await fs.readFile(filePath, 'utf8')

    if (checkExtension(filename, "md")) {
        let {data, content} = matter(raw)
        let html = await markdownToHtml(content)

        const allDetails = {...data, content, html, key: filename.replace(/\.md/g, '')}

        if (fields && fields.length) {
            return fields.reduce((post, field) => {
                post[field] = allDetails[field] || null
                return post
            }, {})
        }

        return allDetails

    } else if (checkExtension(filename, "json")) {
        return JSON.parse(raw)
    }
}

export async function getPostDetails(postKey, fields = []) {
    return await getContent(postKey + ".md", "posts", fields)
}

export async function getPageDetails(postKey, fields = []) {
    return await getContent(postKey + ".md", "pages", fields)
}

export async function getAllPosts(fields = []) {
    const postsDir = path.join(process.cwd(), 'src/contents/posts')
    const postsList = await fs.readdir(postsDir)

    return await Promise.all(postsList.map(async (postKey) => {
        return await getPostDetails(postKey.replace(/\.md/g, ''), fields)
    }))
}
