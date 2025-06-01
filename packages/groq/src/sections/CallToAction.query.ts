import groq from 'groq'
import { DesignQuery } from '../atoms/Design.query'
import { ButtonQuery } from '../atoms/Button.query'
import { isPortableTextQuery } from '../atoms/isPortableText.query'
export const CallToActionQuery = groq`
    _type == "CallToAction" => {
      _type,
      _id,
      _key,
      title,
      _type,
      ${isPortableTextQuery},
      ${ButtonQuery},
      ${DesignQuery},
    }
`
