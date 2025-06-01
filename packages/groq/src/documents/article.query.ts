import { pageBuilderQuery } from '../organisms/PageBuilder.query'
import groq from 'groq'
import { SEO_QUERY } from '../organisms/seo.query'

export const ARTICLE_QUERY = groq`
*[_type == "article" && slug.current == $slug][0] {
  ...,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },

  _type,
  ${SEO_QUERY},
  ${pageBuilderQuery},
  image {
    ...,
    asset-> {
      ...,
      _id,
      url,
      _type,
      altText,
      description,
      title,
      metadata {
        blurHash,
        dimensions
      }
    }
  }
}
`
