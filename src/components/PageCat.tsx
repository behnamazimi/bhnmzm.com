"use client"

import {useSiteSettings} from "@/lib/site-settings"
import {MiyaWalking} from "./illustrations"

export function PageCat() {
    const {catStroll} = useSiteSettings()

    if (!catStroll) return null

    return (
        <div className="pointer-events-none fixed bottom-1 left-0 z-20 animate-stroll" aria-hidden="true">
            <MiyaWalking/>
        </div>
    )
}
