# Mohamed Nejjari — Portfolio

A personal software engineering portfolio built with the Next.js App Router. It presents selected project case studies, an education page, and interactive engineering-principle displays. Project and academic information lives in typed static modules; the application has no database, contact form, or third-party runtime service.

## Stack and structure

- Next.js 16, React 19, strict TypeScript, and Tailwind CSS 4
- Base UI primitives, Lucide icons, and Motion for focused interactions
- `app/` contains the routes, metadata, robots and sitemap handlers, root layout, and global styles.
- `components/layout/` contains shared site chrome; `components/sections/` contains page sections; `components/ui/` contains low-level primitives.
- `features/projects/` contains project cards, filtering, artwork, and source links.
- `data/` contains the typed project, education, and working-principle content.
- `tests/` contains Vitest and Playwright suites.

Server Components are the default. Client Components are limited to browser interactions. The UI uses system font stacks and does not fetch fonts or other external resources at runtime.

## Requirements and local development

Use Node.js 20.9 or newer (the installed Next.js package requirement) and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. No environment variables are required for local development.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

The E2E command builds the standalone production app, starts it locally, and runs Playwright in Chromium. Install the browser locally with `npx playwright install chromium` if needed. GitHub Actions installs Chromium and runs all four checks, then builds the production Docker image; the E2E build also verifies the production build.

## SEO origin configuration

Set `SITE_URL` to the verified HTTPS origin (origin only, with no path) when building for production. It supplies canonical URLs, page-specific Open Graph URLs, and absolute sitemap/robots links. When configured, the social preview uses the existing CV portrait at `/cv/photo.jpg`. When `SITE_URL` is unset, canonical links, social preview metadata, and absolute sitemap entries are omitted rather than pointing crawlers at a guessed or local development host.

## Production runtime and Docker

```bash
npm run build
npm run start
```

The build uses Next.js standalone output and includes `public/` and `.next/static/` in `.next/standalone/`. The app listens on `HOSTNAME` and `PORT` (defaults in Docker: `0.0.0.0:3000`). The runtime needs no credentials or application secrets. The container runs as the non-root `node` user and includes a health check.

Build the container on Linux using the same Node 22 image for build and runtime. Once the public site origin is known, replace the example with that verified origin:

```bash
docker build --build-arg SITE_URL="https://your-domain.example" -t mohamed-nejjari-portfolio .
docker run --rm -p 3000:3000 mohamed-nejjari-portfolio
```

Next standalone output built on Windows may contain non-relocatable absolute junctions, so use the Linux Docker build for deployment. The runtime user can write its deployment directory for Next.js cache data. Review persistent/shared cache handling before running multiple ephemeral replicas.

No cloud deployment target or credentials are configured, so this repository does not publish or deploy automatically. GitHub Actions verifies changes; Dependabot proposes npm and Actions updates without auto-merging them.
