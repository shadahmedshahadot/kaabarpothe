import { NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { GLOBAL_SEO_CACHE_TAG, seoCacheTag } from '@/lib/seo'

/**
 * Called from the admin dashboard after saving SEO changes so the public
 * pages pick up the new metadata without a redeploy.
 *
 * Body: { path?: string, tag?: string, all?: boolean }
 * A shared secret can be enforced via SEO_REVALIDATE_SECRET env if provided.
 */
export async function POST(req: Request) {
  const secret = process.env.SEO_REVALIDATE_SECRET
  if (secret) {
    const header = req.headers.get('x-seo-secret')
    if (header !== secret) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }
  }

  let body: { path?: string; tag?: string; all?: boolean } = {}
  try {
    body = await req.json()
  } catch {
    // empty body — revalidate everything
    body = { all: true }
  }

  const revalidated: string[] = []
  if (body.all || body.path === '*') {
    revalidateTag(GLOBAL_SEO_CACHE_TAG, { expire: 0 })
    revalidateTag('seo:sitemap', { expire: 0 })
    revalidated.push(GLOBAL_SEO_CACHE_TAG, 'seo:sitemap')
  } else {
    if (body.tag) {
      revalidateTag(body.tag, { expire: 0 })
      revalidated.push(body.tag)
    }
    if (body.path) {
      const tag = seoCacheTag(body.path)
      revalidateTag(tag, { expire: 0 })
      revalidateTag('seo:sitemap', { expire: 0 })
      revalidatePath(body.path)
      revalidated.push(tag, 'seo:sitemap', body.path)
    }
    if (!body.tag && !body.path) {
      revalidateTag(GLOBAL_SEO_CACHE_TAG, { expire: 0 })
      revalidated.push(GLOBAL_SEO_CACHE_TAG)
    }
  }

  return NextResponse.json({ success: true, revalidated })
}
