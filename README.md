# Cache-Control reproduction

Created with `create-next-app@16.4.3`: TypeScript, App Router, `src/`, Tailwind
CSS, ESLint, and npm. Next.js is pinned to 16.4.3, with Cache Components and
Partial Prefetching enabled.

## Run locally

```sh
npm install
npm run dev
```

For production caching and ETag behavior, use a production build:

```sh
npm run build
npm start
```

Open [localhost:3000](http://localhost:3000). The normal `dev`, `build`, `start`,
and `lint` commands are unchanged from create-next-app.

## What the reproduction does

`src/proxy.ts` rewrites page requests to `/flags/demo/<path>` and sets:

```http
Cache-Control: max-age=30
CDN-Cache-Control: max-age=86400
```

It also sets a geo cookie when a country header is present, matching the
reported setup. No external services or environment variables are required.

- `/placeholder` is prerendered at build time and has an ETag locally.
- `/article` (or any new path) streams on its first local request, then serves
  complete cached HTML with an ETag on subsequent requests.
- `/streaming` always includes a request-time hole and has no ETag.

The cached data function waits 500 ms and uses `cacheLife({ revalidate: 86400 })`.
`generateStaticParams` only supplies the placeholder path; real paths are
prerendered on demand.

## Check responses

With the production server running on port 3000:

```sh
npm run check:local
```

The check uses a new path on each run and saves results to `local-results.json`.
To use another port, set `PORT` when running the check.

For a real Chromium HTTP-cache test with simulated CDN headers:

```sh
npx playwright install chromium
npm run check:age
```

Both simulated responses have `max-age=30`. The response with `Age: 0` is reused
without another network request; the response with `Age: 60` is already stale
and requires another request. Results are saved to `age-results.json`.

## Deploy

Deploy this directory as a normal Next.js project. No custom build command,
output directory, or environment variables are needed.

Compare document response headers for `/placeholder`, a new path, and
`/streaming` between the local production server and Vercel. In particular,
check whether `max-age=30` survives alongside `CDN-Cache-Control`.

A useful follow-up experiment is to remove only the `CDN-Cache-Control` line in
`src/proxy.ts`, keeping the browser header and 24-hour `cacheLife` unchanged.
This isolates header precedence; the browser's interpretation of an old `Age`
remains a separate issue.
