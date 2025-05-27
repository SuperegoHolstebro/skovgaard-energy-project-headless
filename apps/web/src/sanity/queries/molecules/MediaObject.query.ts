import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'
import { videoObject } from '@/sanity/queries/atoms/VideoObject.query'
import { vimeoObject } from '@/sanity/queries/atoms/VimeoObject.query'

export const MediaObjectQuery = groq`
MediaObject {
  media {
    ...,
    select,
    imageObject {
      image{
        ...,
        "altText": asset->altText,
        "description": asset->description,
        "title": asset->title,
      }
    },
    ${videoObject},
    ${vimeoObject}
  }
}

  `
