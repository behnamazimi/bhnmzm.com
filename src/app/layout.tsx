import type {Metadata, Viewport} from "next"
import {Bricolage_Grotesque, Caveat, Instrument_Sans, JetBrains_Mono} from "next/font/google"
import {PageCat} from "@/components/PageCat"
import {SiteFooter} from "@/components/SiteFooter"
import {SiteHeader} from "@/components/SiteHeader"
import {site} from "@/content/site"
import {SiteSettingsProvider, THEME_INIT_SCRIPT} from "@/lib/site-settings"
import "./globals.css"

const bricolage = Bricolage_Grotesque({subsets: ["latin"], variable: "--font-bricolage", display: "swap"})
const instrument = Instrument_Sans({subsets: ["latin"], variable: "--font-instrument", display: "swap"})
const jetbrains = JetBrains_Mono({subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap"})
const caveat = Caveat({subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-caveat", display: "swap"})

const defaultTitle = `${site.title} - ${site.tagline}`

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {default: defaultTitle, template: `%s - ${site.title}`},
    description: site.description,
    authors: {name: site.title},
    alternates: {canonical: "/"},
    openGraph: {type: "website", siteName: "bhnmzm.com", title: defaultTitle, description: site.description, url: "/", images: [site.ogImage]},
    twitter: {card: "summary_large_image", site: site.twitter, images: [site.ogImage]},
}

export const viewport: Viewport = {width: "device-width", initialScale: 1}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en" data-theme="night" suppressHydrationWarning
              className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable}`}>
        <head>
            <script dangerouslySetInnerHTML={{__html: THEME_INIT_SCRIPT}}/>
        </head>
        <body className="bg-paper font-sans text-lg leading-[1.6] text-ink transition-colors duration-500">
        <SiteSettingsProvider>
            <div className="overflow-x-clip">
                <SiteHeader/>
                <main>{children}</main>
                <SiteFooter/>
            </div>
            <PageCat/>
        </SiteSettingsProvider>
        </body>
        </html>
    )
}
