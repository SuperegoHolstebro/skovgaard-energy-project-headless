import groq from 'groq'

export const isPortableTextQuery = groq`
  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "link" => {
        ...,
        internalLink-> {
          _type,
          slug,
          title
        }
      }
    }
}
`
