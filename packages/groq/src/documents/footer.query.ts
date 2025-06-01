import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'
import { ButtonQuery } from '../atoms/Button.query'

export const FOOTER_QUERY = groq`
    *[_type == "footer" && locale == $locale][0] {
      title,
      locale,
      object {
        companyName,
        adressBook{
          street,
          zip
        },
        telephone,
        email,
        cvr
      },
      social[] {
        platform,
        url,
        ...,
      },
      about {
        title,
        description,
        ${ButtonQuery}
      }
    }

`
