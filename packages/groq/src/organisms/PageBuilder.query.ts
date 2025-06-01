import groq from 'groq'
import { ArticlesTypeQuery } from '../sections/ArticlesType.query'
import { CallToActionQuery } from '../sections/CallToAction.query'
import { CallToActionQuery2 } from '../sections/CallToAction2.query'
import { ContactFormTypeQuery } from '../sections/ContactFormType.query'
import { EmployeesTypeQuery } from '../sections/EmployeesType.query'
import { EventTypeQuery } from '../sections/EventType.query'
import { GalleryQuery } from '../sections/Gallery.query'
import { LogoGalleryQuery } from '../sections/LogoGallery.query'
import { LogoGallery2Query } from '../sections/LogoGallery2.query'
import { heroQuery } from '../sections/Hero.query'
import { textContainerQuery } from '../sections/textContainer.query'
import { textWithIllustrationQuery } from '../sections/TextWithIllustration.query'
import { hero2Query } from '../sections/Hero2.query'
import { hero3Query } from '../sections/Hero3.query'
import { DataTypeQuery } from '../sections/dataType.query'
import { PageTitle_Query } from '../sections/PageTitle.query'
import { AccordionSection_QUERY } from '../sections/AccordionSection.query'

export const pageBuilderQuery = groq`
  pageBuilder[] {
    ${EventTypeQuery},
    ${ArticlesTypeQuery},
    ${ContactFormTypeQuery},
    ${hero2Query},
    ${hero3Query},
    ${CallToActionQuery2},
    ${EmployeesTypeQuery},
    ${LogoGalleryQuery},
    ${LogoGallery2Query},
    // !!!...Unsued...!!! //
    // !!!...Unsued...!!! //
    // !!!...Unsued...!!! //
    // !!!...Unsued...!!! //
    ${heroQuery},
    ${textContainerQuery},
    ${DataTypeQuery},
    ${PageTitle_Query},
    ${AccordionSection_QUERY},
    ${CallToActionQuery},
    ${textWithIllustrationQuery},
    ${GalleryQuery},




  }
`
