import React from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import { Button } from '../atoms/Button'
import { clean } from '@repo/utils/sanitize'
import { FadeUp } from '../interactions/AnimateFadeIn'

const NewsLetterCTA = ({ data }: any) => {
  const gridCols =
    'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
  const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
  const paddingX = 'px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52'
  const paddingY = 'pt-[15vw] sm:pt-[5vw] pb-[15vw] sm:pb-[5vw]'
  return (
    <>
      <Section
        data={data}
        className={`${clean(data?.design?.padding?.spacingBottom) === 'none' ? 'pb-16' : ''}`}
      >
        <div
          className={` bg-primary rounded xl:py-36 text-skovgaard-white col-span-full grid ${gridCols} ${gridGap} ${paddingX} ${paddingY} ${data?.overflow === true ? '-mb-8 sm:-mb-12 md:-mb-20 xl:-mb-28' : ''}`}
        >
          <div className="col-span-full sm:col-span-5 md:col-span-8 xl:col-span-18 prose-headings:!text-skovgaard-white">
            {data?.title && (
              <FadeUp delay={0.2}>
                <Heading
                  spacing="none"
                  size="lg"
                  tag="h3"
                  text="balance"
                  dangerouslySetInnerHTML={{ __html: data?.title }}
                />
              </FadeUp>
            )}
            <div className='max-w-prose'>
              <FadeUp delay={0.4}>
                <Paragraph isPortableText >
                  {data?.body}
                </Paragraph>
              </FadeUp>
            </div>
          </div>
          <div className="sm:my-auto sm:ml-auto col-span-full sm:col-span-3 md:col-span-4 xl:col-span-6">
            <div className="my-auto text-skovgaard-white text-regular *:whitespace-nowrap">
              {data?.link?.label && (
                <FadeUp delay={0.6}>
                  <Button variant="outlineNegative" link={data?.link}>
                    {data?.link?.label}
                  </Button>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </Section>
      {/* if spacingBottom is none AND if color.color is secondary */}
      {clean(data?.design?.color?.color) === 'default' &&
        data?.design?.padding?.spacingBottom === 'none' && (
          <div className="h-20 col-span-full bg-primary/10"></div>
        )}
    </>
  )
}

export default NewsLetterCTA
