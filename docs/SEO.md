# Dynamic SEO Management System

Admin-controlled SEO for every static/public page. Changes made in the Admin
Dashboard flow to the database, are fetched by Next.js `generateMetadata`
server-side, and appear on live pages after a tag-based revalidation — no
redeploy needed.

## Data flow

```
Admin Dashboard  →  PATCH /api/seo/pages/:id  →  PageSEO / GlobalSEO tables
       ↓                                                     ↑
POST /api/seo/revalidate  (revalidateTag)                    │
       ↓                                                     │
Next.js layout/page.generateMetadata  ─── fetch  ────────────┘
       ↓
<head> rendered with fresh title / description / OG / Twitter / JSON-LD
```

## Backend

**Location:** `hajj-umrah-backend/src/app/modules/seo/`

| File | Role |
|------|------|
| `seo.routes.ts` | Express router (`/api/seo/*`) |
| `seo.controller.ts` | HTTP handlers (`catchAsync` + `sendResponse`) |
| `seo.service.ts` | Prisma CRUD + `SeedDefaults()` |
| `seo.validation.ts` | Zod schemas (create / update / global upsert) |
| `seo.registry.ts` | In-code list of the seedable static pages + default global SEO |

**Prisma models** (`hajj-umrah-backend/prisma/schema.prisma`):

- `GlobalSEO` — singleton `key = "global"`, site-wide defaults (title
  template, OG image, verification codes, favicon, Organization / WebSite
  JSON-LD).
- `PageSEO` — one row per `(pagePath, locale)` and per `(pageKey, locale)`.
  Stores every SEO field: title, meta description, keywords, robots (+ max
  snippet / image / video preview), canonical, OG, Twitter, structured
  data (JSON), custom meta, breadcrumbs, seoStatus.

**Migration:**
`hajj-umrah-backend/prisma/migrations/20260815090000_add_seo_models/migration.sql`

Apply with:

```
cd hajj-umrah-backend
npx prisma migrate deploy   # production
# or, for dev:
npx prisma migrate dev
```

**Seed defaults:** run once with `npm run db:seed` (the main seed script now
calls `seedSEODefaults()`, which is idempotent — safe to re-run). At any
time an admin can also call `POST /api/seo/seed-defaults` to backfill new
registry entries without wiping other data.

### API endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/seo/global` | public | Global defaults (used by root layout + fallbacks) |
| GET | `/api/seo/pages/resolve?path=/about&locale=bn-BD` | public | Resolve SEO for a path |
| GET | `/api/seo/pages/by-key/:pageKey` | public | Resolve SEO by registry key |
| GET | `/api/seo/public/pages` | public | Published pages list (used by sitemap) |
| GET | `/api/seo/pages` | ADMIN | Full list (filters: locale, search) |
| GET | `/api/seo/pages/:id` | ADMIN | Full page detail |
| POST | `/api/seo/pages` | ADMIN | Create new SEO row |
| PATCH | `/api/seo/pages/:id` | ADMIN | Update |
| DELETE | `/api/seo/pages/:id` | ADMIN | Delete (system pages are protected) |
| PUT | `/api/seo/global` | ADMIN | Upsert global defaults |
| POST | `/api/seo/seed-defaults` | ADMIN | Idempotent registry backfill |

Route wired into `hajj-umrah-backend/src/app/routes/index.ts` under `/seo`.

## Frontend

**Loader:** `hajj-umrah-fontend/src/lib/seo.ts`

- `fetchGlobalSEO()` — fetches `GET /seo/global` with `revalidate: 300` and
  tag `seo:global`.
- `fetchPageSEO(path, locale)` — fetches `GET /seo/pages/resolve` with tag
  `seo:<path>` and the global tag.
- `resolvePageSEO(path, locale)` — merges Global + Page → Next.js `Metadata`
  object + array of JSON-LD objects. Fallback hierarchy: page value → global
  default → hard-coded SITE constant.
- `generateSEOMetadata(path, locale)` — convenience for pages that only need
  Metadata (no JSON-LD).

**JSON-LD renderer:** `hajj-umrah-fontend/src/components/seo/StructuredData.tsx`
Escapes `<` to `<` to prevent injection.

**Static page registry:** `hajj-umrah-fontend/src/constants/seo-pages.ts`
Add a new static page? One line here, one entry in the backend
`seo.registry.ts`, and it will show up in the admin dashboard after the
next seed.

**Pages updated to use dynamic SEO:**

- `src/app/layout.tsx` — reads global SEO into the root Metadata.
- `src/app/page.tsx` (home)
- `src/app/about/page.tsx`
- `src/app/contact/layout.tsx`
- `src/app/faq/layout.tsx`
- `src/app/reviews/layout.tsx`
- `src/app/packages/hajj/page.tsx`
- `src/app/packages/umrah/page.tsx`
- `src/app/transportation/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/sitemap.ts` — pulls published pages from `GET /seo/public/pages`
  and excludes any row whose robots include `noindex`.
- `src/app/robots.ts` — reads `siteUrl` from global SEO.

**RTK Query slice:** `src/redux/fetchres/seo/seoApi.ts`
Hooks:
`useListSEOPagesQuery`, `useGetSEOPageQuery`, `useCreateSEOPageMutation`,
`useUpdateSEOPageMutation`, `useDeleteSEOPageMutation`,
`useGetGlobalSEOQuery`, `useUpsertGlobalSEOMutation`,
`useSeedSEODefaultsMutation`.

**Admin UI:**

| Route | File |
|-------|------|
| `/admin/seo` | List with SEO score chip per page, seed / add / edit / delete |
| `/admin/seo/global` | Global defaults editor + verification codes + Organization / WebSite JSON-LD |
| `/admin/seo/new` | Create custom page SEO |
| `/admin/seo/[id]/edit` | Full editor (tabs: General / OG / Twitter / Advanced / Preview) |

Shared components:
`src/features/admin/seo/SEOEditor.tsx`,
`src/features/admin/seo/SEOPreviews.tsx`,
`src/features/admin/seo/CharacterCounter.tsx`,
`src/features/admin/seo/seoScore.ts`.

Nav entry added under **Marketing → SEO Management** in
`src/features/admin/constants/navigation.ts`.

## Cache & revalidation

Metadata fetches use tags:
- `seo:global` — global defaults
- `seo:<pagePath>` — per-page
- `seo:sitemap` — published-pages list

**On admin save**, the editor POSTs `/api/seo/revalidate` (a Next.js Route
Handler at `src/app/api/seo/revalidate/route.ts`) which calls
`revalidateTag()` / `revalidatePath()` for the affected keys. Set
`SEO_REVALIDATE_SECRET` in the Next.js env if you want to require an
`x-seo-secret` header on that endpoint.

Public reads are cached for 5 minutes by default (`revalidate: 300`) so
missing an explicit revalidate never leaves stale metadata for long.

## Adding SEO for a brand-new static page

1. Add the route (`src/app/foo/page.tsx`) as usual.
2. In the page (or its layout), add:
   ```ts
   import StructuredData from '@/components/seo/StructuredData'
   import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

   export async function generateMetadata() {
     return generateSEOMetadata('/foo')
   }

   export default async function FooPage() {
     const { structuredData } = await resolvePageSEO('/foo')
     return (
       <>
         <StructuredData data={structuredData} keyPrefix="foo" />
         {/* page body */}
       </>
     )
   }
   ```
3. Add the page to the registries so admins see it:
   - `hajj-umrah-fontend/src/constants/seo-pages.ts`
   - `hajj-umrah-backend/src/app/modules/seo/seo.registry.ts` (and mirror
     the entry in `prisma/seed.ts` `STATIC_PAGES` if you want it seeded
     automatically).
4. Have an admin hit **Seed defaults** in `/admin/seo` (or POST
   `/api/seo/seed-defaults`) to insert the new row.

## Security

- All write endpoints (`POST/PATCH/PUT/DELETE`) are behind `auth(UserRole.ADMIN)`.
- Zod validates every request body.
- Prisma P2002 → `409 Conflict` (helpful when path/key collides for a
  locale).
- Structured-data JSON is parsed & re-serialised, and the `<script>` output
  escapes `<` to prevent tag-breakouts.
- No client-side metadata fetching — the site never renders admin-provided
  text in the browser before it has been through the same server pipeline.

## Environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | backend | Neon / Postgres |
| `NEXT_PUBLIC_API_BASE_URL` | frontend | Base URL for backend API (default `http://localhost:9000/api`) |
| `SEO_REVALIDATE_SECRET` | frontend | Optional — enforces `x-seo-secret` header on `/api/seo/revalidate` |

## Migration & seed commands

```
# backend
cd hajj-umrah-backend
npx prisma migrate deploy    # apply migration on production DB
npm run db:seed              # (dev) full seed including SEO defaults
# or admin-triggered idempotent SEO-only backfill:
curl -X POST -H "Authorization: Bearer <admin-jwt>" \
  https://api.example.com/api/seo/seed-defaults
```
