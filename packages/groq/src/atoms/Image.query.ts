import groq from 'groq'
export const ImageQuery = groq`
  
    ...,
    "altText": asset->.altText,
    "description": asset->.description,
    "title": asset->.title
`
