import { defineQuery, groq } from 'next-sanity'
import { isPortableTextQuery } from '../atoms/isPortableText.query'
import { ButtonQuery } from '../atoms/Button.query'

export const InnerBlocksQuery = defineQuery(`
innerBlocks[] {
  ...,
  _type == "button" => {
    ${ButtonQuery},
    style,
  },
  ${isPortableTextQuery}
}

`)
