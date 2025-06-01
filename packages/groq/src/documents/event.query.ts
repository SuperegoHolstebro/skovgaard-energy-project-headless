import { pageBuilderQuery } from '../organisms/PageBuilder.query'
import groq from 'groq'
import { SEO_QUERY } from '../organisms/seo.query'

export const EVENT_QUERY = groq`
*[_type == "event" && slug.current == $slug][0] {
  ...,
  _type,
  "localeInfo": {
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      _type,
      slug,
      locale
    },
  },
  ${SEO_QUERY},
  ${pageBuilderQuery},
  mainImage
}
`
