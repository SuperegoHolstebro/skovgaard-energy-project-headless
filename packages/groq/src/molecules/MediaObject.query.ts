import groq from 'groq'
import { videoObject } from '../atoms/VideoObject.query'
import { vimeoObject } from '../atoms/VimeoObject.query'

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
