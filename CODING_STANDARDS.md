# CODING_STANDARDS.md
> Standards for our React + Next.js (TypeScript + Tailwind) codebase.  
> CodeRabbit scans this doc and applies it during PR reviews.

## 1) Baseline
- **Language:** TypeScript only. No `any` unless justified with a comment.
- **Framework:** Next.js (App Router preferred). Use Server Components by default.
- **Styling:** Tailwind CSS. Avoid bespoke CSS unless necessary.
- **Formatting/Lint:** Prettier + ESLint (next/core-web-vitals, typescript-eslint, jsx-a11y).

## 2) Project Structure (App Router)
public/

pages/
  api/
    hello.ts                # example API route
  _app.tsx
  _document.tsx
  _error.tsx                # optional legacy error page
  404.tsx
  500.tsx
  index.tsx                 # /
  about.tsx                 # /about
  posts/
    index.tsx               # /posts
    [id].tsx                # /posts/[id]

src/
  components/
    common/                 # shared UI primitives used anywhere
      Button.tsx
      Card.tsx
      ...
    home/                   # corresponds to pages/index.tsx  → route: /
      index.tsx             # main composition for the route
      components/
        Hero.tsx
        Features.tsx
        ...
    about/                  # corresponds to pages/about.tsx → route: /about
      index.tsx
      components/
        TeamGrid.tsx
        Values.tsx
        ...
    posts/                  # corresponds to pages/posts/*
      index.tsx             # list route (/posts)
      components/
        PostList.tsx
        Filters.tsx
        ...
      [id]/                 # dynamic sub-route (/posts/[id])
        index.tsx
        components/
          PostHeader.tsx
          Comments.tsx
          ...

  lib/                      # pure TS utils, fetch wrappers, constants
    fetcher.ts
    constants.ts
    utils.ts
  hooks/
    useAuth.ts
    usePagination.ts
  context/
    AuthContext.tsx
  services/
    api.ts
  helpers/
    formatDate.ts
  validators/
    post.schema.ts
  types/
    index.d.ts

styles/
  globals.css

tests/                      # or __tests__/ (do not nest under styles)



- Keep components small and focused. Co-locate tests next to files: `Component.test.tsx`.

## 3) TypeScript Rules
- Enable `strict`, `noImplicitAny`, `noUncheckedIndexedAccess`.
- Prefer **interfaces** for component props; **types** for unions & utility shapes.
- Export **types** from `types/` or `lib/` (no circular deps).
- Never ignore errors with `// @ts-ignore` unless explained.

## 4) React Conventions
- Components: **PascalCase** in `components/`. File = component name.
- Props: typed, with minimal optional props. Provide sensible defaults.
- Avoid prop drilling; prefer context or composition.
- Memoization: `useMemo`/`useCallback` only when it measurably helps (beware overuse).
- Event handlers: `onClick`, `onChange` names; avoid inline anonymous functions inside lists where perf matters.

## 5) Next.js Conventions — Pages Router

- **Rendering Model:** Pages are client components by default. Choose per-page data strategy:
  - **SSG** with `getStaticProps` (and `getStaticPaths` for dynamic routes); add `revalidate` for ISR.
  - **SSR** with `getServerSideProps` only when truly needed (personalization, per-request data).
  - **CSR** for interactive data using SWR/React Query.

- **Data Fetching:**
  - Use `getStaticProps`/`getStaticPaths` for static content; prefer ISR over frequent SSR.
  - Use `getServerSideProps` for authenticated or frequently changing server data.
  - Client-side fetching with SWR/React Query for live/interactive views.
  - Put fetch/util logic in `src/lib/` and import into pages or API routes.

- **Mutations & APIs:**
  - Implement mutations in **API routes** under `pages/api/*.ts`.
  - Keep API handlers thin; validate inputs on the server and return typed responses.

- **Routing (file-system):**
  - Define routes in `pages/` (e.g., `pages/index.tsx`, `pages/about.tsx`).
  - Dynamic routes: `pages/posts/[id].tsx`
  - Catch-all / optional catch-all: `pages/docs/[...slug].tsx`, `pages/docs/[[...slug]].tsx`
  - Keep pages slim; move reusable UI into `src/components/`.

- **Images:**
  - Always use `next/image` with explicit `width`/`height` (or `fill`) and descriptive `alt`.
  - Set `sizes` for responsive images; use `priority` for above-the-fold assets.

- **Layouts, Head & HTML Shell:**
  - Use `_app.tsx` for global providers, layout wrappers, and global styles.
  - Use `_document.tsx` to customize the HTML shell (e.g., `<Html lang="en">`, preload fonts).
  - Use `next/head` for per-page metadata (title, description, OG tags).

- **Error & Fallbacks:**
  - Provide `pages/404.tsx` and `pages/500.tsx`.
  - For SSG dynamic routes, use `getStaticPaths` `fallback: true`/`"blocking"` as appropriate.

- **Dynamic Imports:**
  - Use `next/dynamic` for heavy, client-only modules; set `{ ssr: false }` **only if necessary**.
  - Code-split thoughtfully to keep TTI fast.

- **Notes (Pages vs App Router):**
  - No `"use client"` directives here.
  - Prefer SSG/ISR over SSR where possible to reduce server load and improve performance.


## 6) Tailwind Conventions
- Class order: layout → box → typography → visual → variants → state. Keep lines readable; wrap if too long.
- Extract repeated class combos into:
  - **`@apply`** in small utilities, or
  - Reusable components in `components/ui`.
- Prefer semantic composition (e.g., `btn`, `card`) via components over long ad-hoc class strings.
- Use design tokens via Tailwind config (colors, spacing, radii). Don’t hardcode hex values in components.

## 7) Accessibility & i18n
- All interactive elements must be reachable by keyboard and have visible focus.
- Provide `aria-*` where appropriate; label inputs; use semantic HTML.
- Images must have descriptive `alt` (or `""` if decorative).
- Prefer `next/link` for navigation. Use `role`/`aria-current="page"` for active links.

## 8) State, Data & Side Effects
- Local UI state → component state.
- Cross-component state → context or a minimal state library.
- Server mutations → server actions or API routes with input validation.
- Side effects in `useEffect` only; clean up subscriptions/timeouts.

## 9) Security
- Never commit secrets; use environment variables with `NEXT_PUBLIC_` only for safe client exposure.
- Validate all inputs on server boundaries.
- Use `helmet` headers via middleware where applicable; prefer strict CSP when feasible.

## 10) Performance
- Measure first (React Profiler, Lighthouse).
- Use `revalidate` and route-level caching thoughtfully.
- Avoid large client bundles; split with `dynamic`.
- Prefer streaming + Suspense on data-heavy routes.

## 11) Testing
- **Unit:** Jest + React Testing Library.
- **E2E:** Playwright (or Cypress) for critical flows.
- Write tests for new features & bug fixes. Keep CI green before merge.

<!-- ## 12) Git & PR Process
- Branches: `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- Commits: imperative, scoped (`feat(auth): add otp flow`).
- PRs: small, focused, with:
  - Summary, screenshots (UI changes), checklists, and test notes.
- Required checks must pass. Resolve all CodeRabbit/blocking comments. -->

## 12) Code Review Heuristics (what reviewers look for)
- Clear types; no hidden `any`.
- Server vs Client component choice justified.
- Tailwind classes readable / deduped / tokenized.
- Accessibility: labels, roles, keyboard access.
- Tests present for changed logic.

---
