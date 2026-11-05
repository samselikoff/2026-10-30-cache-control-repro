# Cache-Control reproduction

A minimal Next.js 16.4.3 app with Cache Components enabled. `src/proxy.ts` sets `Cache-Control: max-age=300` and `CDN-Cache-Control: max-age=86400` on every page.

`/on-demand/[slug]` uses `generateStaticParams` to prerender only `/on-demand/build-time` at build. Any other slug, like `/on-demand/runtime`, is rendered on its first request and then cached. Compare the response headers of the two to see the issue.

Run it with `npm run build && npm start`, then open [localhost:3000](http://localhost:3000).
