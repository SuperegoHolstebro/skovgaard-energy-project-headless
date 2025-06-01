import groq from 'groq'
import { isPortableTextQuery } from '../atoms/isPortableText.query'
import { ButtonQuery } from '../atoms/Button.query'
export const AccordionSection_QUERY = groq`
  _type == "accordion" => {
    _type, 
    _key,
    design,
    title,
    accordions[]{
      _key,
      title,
      ${isPortableTextQuery},
      ${ButtonQuery}
    }
    }
`
