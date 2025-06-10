import { MetadataRoute } from 'next'
import { getClient } from '@repo/utils/lib/sanity.client'
import Appconfig from '@repo/utils/superego.config'
import { ALL_SLUGS_QUERY } from '@repo/groq/organisms/allSlugs.query'
import { resolveHref } from '@repo/utils/resolveHref'

const client = getClient()

// Fetch all slugs from Sanity
export async function getSlugs() {
  return client.fetch(ALL_SLUGS_QUERY)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs()
  // Map the slugs to create URLs for each page
  const dynamicPages = slugs.map(
    (slug: { locale: any; _type: string; slug: string; _updatedAt: string }) => ({
      url: `https://www.reddap.dk/${resolveHref(slug.locale, slug._type, Array.isArray(slug.slug) ? slug.slug.join('/') : slug.slug)?.replace(/^\//, '')}`,
      lastModified: slug._updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  )

  // Combine static and dynamic URLs into the sitemap
  return [...dynamicPages]
}
