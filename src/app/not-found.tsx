import type {Metadata} from "next"
import {ErrorView} from "@/components/ErrorView"
import {TextLink} from "@/components/TextLink"

export const metadata: Metadata = {title: "Page not found"}

export default function NotFound() {
    return (
        <ErrorView title="Page not found" message="The page you are looking for does not exist or was deleted.">
            <TextLink href="/">Go home →</TextLink>
        </ErrorView>
    )
}
