import type {MetadataRoute} from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Behnam Azimi",
        short_name: "bhnmzm",
        start_url: "/",
        display: "browser",
        icons: [{src: "/icon.png", sizes: "512x512", type: "image/png"}],
    }
}
