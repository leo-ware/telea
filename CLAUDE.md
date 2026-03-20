# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run gen-types    # Regenerate Supabase TypeScript types → src/supabase/types.ts
npm run tsc          # Typecheck
```

> **Package manager:** This project uses **npm**. Do not use yarn.

### Supabase CLI
The Supabase CLI is available via `npx supabase`. Requires login first (`npx supabase login`).
- **Generate types:** `npx supabase gen types typescript --project-id rbdxrsvwmsbsivvedzyv > src/supabase/types.ts` (or `npm run gen-types`)
- Run `npm run gen-types` after any database schema changes to keep `src/supabase/types.ts` in sync.

Use `npm run tsc` before returning to the user when you change the code in any significant way.
We need to verify that it still typechecks after your changes.


## Architecture

**Telea Insights** — a Next.js 15 (App Router) site for a philanthropic/non-profit consultancy. Has public marketing pages and a protected admin dashboard for content management.

### Tech Stack
- **Framework:** Next.js 15, React 18, TypeScript
- **Database/Auth:** Supabase (Postgres + Auth via Google OAuth / email-password)
- **ORM:** Drizzle ORM (drizzle-kit for migrations)
- **Styling:** Tailwind CSS 3 with custom color palette (sky-blue, prussian-blue, blue-green, etc.) + Typography plugin
- **Client data fetching:** SWR
- **Drag-and-drop:** React DnD (admin reordering)
- **Markdown:** react-markdown for rich text rendering
- **Deployment:** Vercel (with cron job at `/api/check` to keep Supabase alive)

### Path Alias
`@/*` maps to `./src/*`

### Route Structure (`src/app/`)

| Group | Purpose |
|---|---|
| `/(main)` | Public pages: landing, about, contact, careers, events, opportunities, people, work/[slug], clients/[slug] |
| `/(jobs)` | Job board: `/job-board/[id]`, `/create-job-post` |
| `/admin` | Protected dashboard — CRUD for clients, employees, events, jobs, categories, images, inbox |
| `/api/check` | Cron endpoint (Supabase keep-alive) |
| `/login`, `/signout` | Auth pages |

### Data Flow Patterns

- **Server components** use `createClient()` from `src/supabase/server.ts` for direct DB queries
- **Client components** use `createClient()` from `src/supabase/client.ts` with SWR or React state
- **Mutations** are handled via Next.js server actions (`"use server"`)
- **Contact form** posts to Mailchimp API + saves to Supabase `inbox` table

### Auth
- Admin routes (`/admin/*`) check for authenticated Supabase user in layout; redirect to `/login` if unauthenticated
- Session persisted in cookies via `@supabase/ssr`

### Image Storage
- Supabase Storage bucket `imgs`
- `ImgPicker` component in admin for upload/selection
- `special_images` table for landing page hero images

### Key Database Tables
`clients`, `client_categories`, `featured_clients`, `work_categories`, `employees`, `events`, `jobs`, `inbox`, `special_images`, `external_links`, `check_ins`

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous JWT

### ESLint
Extends `next/core-web-vitals`. Disabled rules: unescaped entities, jsx-key, exhaustive-deps, img-element, alt-text.
