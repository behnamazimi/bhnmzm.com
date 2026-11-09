# bhnmzm.com

Personal site of Behnam Azimi. Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Deployed on Vercel from `main`.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build
npm run typecheck && npm run lint && npm test
```

## Layout

- `src/app`: routes only (home, `/blog`, `/blog/[slug]`, metadata routes).
- `src/features`: one folder per home section. A feature never imports another feature.
- `src/components`: shared presentational pieces and SVG illustrations.
- `src/content`: typed data (profile, projects, proxy notes) and the blog posts in `posts/*.md`.
- `src/lib`: posts and markdown pipeline, dates, site settings (theme, cat), clarinet synth.

The design source is `docs/design/home-v10.dc.html`.

Posts are licensed as in `LICENSE-posts`, the source as in `LICENSE-project-source`.
