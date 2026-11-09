"use client"

import {ErrorView} from "@/components/ErrorView"
import {focusRing} from "@/components/focus"

export default function Error({reset}: {error: Error, reset: () => void}) {
    return (
        <ErrorView title="Something went wrong" message="An unexpected error occurred.">
            <button type="button" onClick={reset}
                    className={`min-h-10 cursor-pointer rounded-full border-2 border-ink bg-card px-4 text-[15px] font-semibold text-ink hover:shadow-[3px_3px_0_var(--color-ink)] ${focusRing}`}>
                Try again
            </button>
        </ErrorView>
    )
}
