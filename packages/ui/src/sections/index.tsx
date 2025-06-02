// components/sections/index.ts
import Hero from './HeroSection'
import Hero2 from './Hero2Section'
import Hero3 from './Hero3Section'
import CallToActionSection from './CallToActionSection'
import CallToActionSection2 from './CallToActionSection2'
import EmployeesSection from './EmployeesSection'
import LogoGallery from './LogoGallery'
import LogoGallery2 from './LogoGallery2'
import TextWithIllustration from './TextWithIllustration'
import ContactFormSection from './ContactFormSection'
import GallerySection from './GallerySection'
import ArticlesSection from './ArticlesSection'
import EventSection from './EventSection'
import TextContainer from './textContainer'
import Media from './MediaSection'
import DataType from './DataType'
import PageTitle from './PageTitle'
import AccordionSection from './AccordionSection'
import ProcessSection from './ProcessSection'
import NewsLetterCTA from './NewsLetterCTA'

// use keyof Sanity schema later with proper types
/**
 * A record mapping section names to their corresponding React component types.
 * Each key in the record represents a section identifier, and the value is a React component
 * that renders the respective section.
 *
 * @remarks
 * This object is used to dynamically render sections based on their type.
 * The first part of the key is the section type from sanity, and the second part is the component name.
 *
 * @typeParam string - The key representing the section type.
 * @typeParam React.ComponentType<any> - The React component type for the section.
 *
 * @example
 * ```tsx
 * const Section = sectionComponents['hero'];
 * return <Section {...props} />;
 * ```
 */
export const sectionComponents: Record<string, React.ComponentType<any>> = {
  // Schema: Component,
  hero: Hero,
  DataType: DataType,
  GalleryType: GallerySection,
  LogoGallery: LogoGallery,
  pageTitle: PageTitle,
  accordion: AccordionSection,
  ProcessType: ProcessSection,
  CallToAction: CallToActionSection,
  NewsLetterCTA: NewsLetterCTA,


  /* !!!...Unsued...!!! */
  /* !!!...Unsued...!!! */
  /* !!!...Unsued...!!! */
  /* !!!...Unsued...!!! */
  Hero2: Hero2,
  Hero3: Hero3,
  EmployeesType: EmployeesSection,
  CallToAction2: CallToActionSection2,
  LogoGallery2: LogoGallery2,
  textWithIllustration: TextWithIllustration,
  contactFormType: ContactFormSection,
  Gallery: GallerySection,
  ArticlesType: ArticlesSection,
  EventType: EventSection,
  textContainer: TextContainer,
  MediaType: Media,

}
