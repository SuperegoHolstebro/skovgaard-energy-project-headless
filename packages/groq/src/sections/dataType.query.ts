import groq from 'groq'
import { ButtonQuery } from '../atoms/Button.query'
import { DesignQuery } from '../atoms/Design.query'

export const DataTypeQuery = groq`
_type == "DataType" => {
  ...,
  dataBox[] {
    ...,
  },
  ${ButtonQuery},
  ${DesignQuery}
}`
