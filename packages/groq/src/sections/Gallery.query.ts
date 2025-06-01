import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'
export const GalleryQuery = groq`
_type == "GalleryType" => {
  ...,
  medie[] {
    ...,
    _type == "image" => {
      image{
      ${ImageQuery},
      },
      title,
      ...
    },
    _type == "videoObject" => {
      ...,
      ${ImageQuery},
        title,

      video {
        title,
        asset-> {
          ...
        }
      }
    }
  },
  images[] {
    ...,
    _type == "image" => {
      ${ImageQuery},
      ...
    },
    _type == "videoObject" => {
      ...,
      ${ImageQuery},
      video {
        asset-> {
          ...
        }
      }
    }
  }
}

`
