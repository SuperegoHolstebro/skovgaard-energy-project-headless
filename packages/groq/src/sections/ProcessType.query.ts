import { groq } from 'next-sanity'
import { ImageQuery } from '../atoms/Image.query'
import { InnerBlocksQuery } from '../molecules/InnerBlocks.query'

export const ProcessTypeQuery = groq`
  _type == 'ProcessType' => {
      title,
  description,
  ...,
  processes[]{
    year,
    processes[]->{
      title,
      ${InnerBlocksQuery},
      image{
        ${ImageQuery}
      },
      _type,
    }
  },
  design,
  SectionSettings

}`
