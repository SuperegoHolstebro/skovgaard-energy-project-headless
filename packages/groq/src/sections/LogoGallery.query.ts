import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'
export const LogoGalleryQuery = groq`
_type == "LogoGallery" => {
  ...,
  images[] {
    // ${ImageQuery},
  }
}
`
