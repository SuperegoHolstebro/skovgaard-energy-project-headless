import React from 'react'
import Section from './Section'
import { motion } from 'framer-motion'
import Heading from '../atoms/Heading'
import Accordion from '../molecules/Accordion'
import Paragraph from '../atoms/Paragraph'
import { clean } from '@repo/utils/src/sanitize'
import { FadeUp } from '../interactions/AnimateFadeIn'
const AccordionSection = ({ data }: any) => {
  return (
    <Section className='relative'
      data={data}
    >
      <div className="col-start-1 sm:-col-end-1 md:col-end-7 lg:col-end-7 xl:col-end-10 -col-end-1 ">
        <div className='sm:sticky top-28 xl:top-36'>
          <Heading text="pretty" tag="h3" type="h3">
            {data.title}
          </Heading>
        </div>
      </div>
      <div className="col-start-1 sm:col-start-1 md:col-start-7 lg:col-start-8 xl:col-start-12 -col-end-1 space-y-1.5">
        <FadeUp>
          <div className="mb-8 space-y-4">
            {data.accordions && data?.accordions?.map((accordion: any, index: number) => (
              <FadeUp
                key={accordion._key}
                delay={index * 0.1}
              >
                <Accordion
                  title={accordion?.title}
                  unfloded={clean(accordion?.unfloded as any) || false}
                >
                  <Paragraph isPortableText size="regular">
                    {accordion?.body as any}
                  </Paragraph>
                </Accordion>
              </FadeUp>

            ))}
          </div>
        </FadeUp>

      </div>
    </Section>
  )
}

export default AccordionSection
