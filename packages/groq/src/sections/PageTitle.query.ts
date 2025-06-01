import groq from 'groq'

export const PageTitle_Query = groq`
  _type == "pageTitle" => {...,}
`
