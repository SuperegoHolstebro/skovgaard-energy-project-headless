import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'

export const SEO_QUERY = groq` // Inuse
seoGroup {
  seoImage {
    ${ImageQuery}
  },
  ...
}
`
