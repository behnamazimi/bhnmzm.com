import type {Metadata} from "next"
import {site} from "@/content/site"

interface PageMetaInput {
    title?: string
    description?: string
    path: string
    image?: string
}

// openGraph/twitter objects are not merged with the layout's, so each page states them in full.
export function pageMetadata({title, description = site.description, path, image = site.ogImage}: PageMetaInput): Metadata {
    const fullTitle = title ? `${title} - ${site.title}` : `${site.title} - ${site.tagline}`

    return {
        ...(title && {title}),
        description,
        alternates: {canonical: path},
        openGraph: {type: "website", siteName: "bhnmzm.com", title: fullTitle, description, url: path, images: [image]},
        twitter: {card: "summary_large_image", site: site.twitter, title: fullTitle, description, images: [image]},
    }
}
