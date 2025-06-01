import groq from 'groq'
import { InnerBlocksQuery } from '../molecules/InnerBlocks.query'

export const textContainerQuery = groq`
    _type == "textContainer" => {
      ...,
    ${InnerBlocksQuery}
    }

`
