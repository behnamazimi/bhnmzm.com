import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{protocol: "https", hostname: "raw.githubusercontent.com"}],
  },
  async redirects() {
    return [
      {source: "/about", destination: "/#about", permanent: true},
      {source: "/projects", destination: "/#work", permanent: true},
      {source: "/contact-me", destination: "/", permanent: true},
      {source: "/tracking", destination: "/", permanent: true},
    ]
  },
}

export default nextConfig
