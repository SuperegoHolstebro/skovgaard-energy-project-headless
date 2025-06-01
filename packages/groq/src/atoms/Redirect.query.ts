import groq from 'groq'

export const redirectQuery = groq`
 *[_type == 'redirect']{
    subLinks[]{
      "destination": destinationPage->{
        ...,
      },
          "source": source->{
        ...,
      },
    }
  }
`
