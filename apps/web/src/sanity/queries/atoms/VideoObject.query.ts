import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'
export const videoObject = groq`
videoObject {
  ...,
  video {
    asset-> {
      _id,
      url,
      _type,
      altText,
      description,
      title
    }
  },
  image
}
`
