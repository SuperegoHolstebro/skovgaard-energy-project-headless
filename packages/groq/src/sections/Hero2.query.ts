import groq from 'groq'
import { DesignQuery } from '../atoms/Design.query'
import { MediaObjectQuery } from '../molecules/MediaObject.query'
export const hero2Query = groq`
_type == "Hero2" => {
  title, 
  _type,
  ${MediaObjectQuery},
  ${DesignQuery},
}
`
