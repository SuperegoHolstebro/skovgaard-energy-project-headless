import groq from 'groq'
import { ButtonQuery } from '../atoms/Button.query'
import { DesignQuery } from '../atoms/Design.query'
import { isPortableTextQuery } from '../atoms/isPortableText.query'

export const DataTypeQuery = groq`
_type == "DataType" => {
  ...,
  dataBox[] {
    ...,
    _key,
    _type,
    heading,
    icon,
  ${ButtonQuery},

    ${isPortableTextQuery},
  },
  link{
    ${ButtonQuery},
    style
  },
  ${DesignQuery}
}`
