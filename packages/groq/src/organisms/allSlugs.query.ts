import groq from 'groq'

// GROQ All Slugs for sitemap
export const ALL_SLUGS_QUERY = groq`
*[defined(slug.current)][]{
  "slug":slug.current,
  _type,
  locale,
  _updatedAt,
  locale,
}
`
