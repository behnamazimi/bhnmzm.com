import {remark} from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"

export async function markdownToHtml(markdown: string) {
    const result = await remark().use(remarkGfm).use(remarkHtml, {sanitize: true}).process(markdown)
    // Links leaving the site open in a new tab.
    return result.toString().replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
}
