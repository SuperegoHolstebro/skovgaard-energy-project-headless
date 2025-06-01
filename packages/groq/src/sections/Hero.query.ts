import groq from 'groq'
import { MediaObjectQuery } from '../molecules/MediaObject.query'

export const heroQuery = groq`
_type == "hero" => {
...,
images[]{
"image": asset->url,
},
"video": file.asset->url,
}
`
