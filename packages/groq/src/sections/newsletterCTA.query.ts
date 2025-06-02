import { groq } from 'next-sanity'
import { ButtonQuery } from '../atoms/Button.query'
import { DesignQuery } from '../atoms/Design.query'
import { isPortableTextQuery } from '../atoms/isPortableText.query'

export const NewsLetterCTA_QUERY = groq`
_type == 'NewsLetterCTA' => {
  _type,
  _key,
  _id,
  title,
  ${isPortableTextQuery},
  ${ButtonQuery},
  ${DesignQuery},
  SectionSettings,
}`
