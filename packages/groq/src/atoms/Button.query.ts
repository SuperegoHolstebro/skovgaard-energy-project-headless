import groq from 'groq'

export const ButtonQuery = groq`
link {
  ...,
  internalLink-> {
    _type,
    slug,
    title,
    locale,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value-> {
      title,
      slug,
      locale
    }
  },
  file {
    asset-> {
      ...
    }
  }
}
`
