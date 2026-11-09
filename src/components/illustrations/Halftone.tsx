export const HALFTONE = "url(#halftone)"

// Every illustration renders the same pattern, so duplicate ids on a page all resolve to identical dots.
export function Halftone() {
    return (
        <defs>
            <pattern id="halftone" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r=".75" className="fill-ink-fixed" opacity=".45"/>
                <circle cx="3" cy="3" r=".75" className="fill-ink-fixed" opacity=".45"/>
            </pattern>
        </defs>
    )
}
