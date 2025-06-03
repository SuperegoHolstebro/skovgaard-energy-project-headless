'use client'
import Section from './Section'
import Paragraph from '../atoms/Paragraph'
import Heading from '../atoms/Heading'
import { Button } from '../atoms/Button'
import { clean } from '@repo/utils/sanitize'
import { FadeUp } from '../interactions/AnimateFadeIn'
const gridCols =
  'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
const paddingX =
  'px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-[8.5rem] 2xl:px-52'
const paddingY = 'pt-[15vw] sm:pt-[5vw] pb-[15vw] sm:pb-[5vw]'

const CallToAction = ({ data }: any) => {
  return (
    <>
      <Section
        data={data}
        className={`${clean(data?.design?.padding?.spacingBottom === 'none' ? 'pb-16' : '')}`}
      >
        <div
          className={` bg-primary rounded xl:py-36 !text-skovgaard-white col-span-full grid ${gridCols} ${gridGap} ${paddingX} ${paddingY} ${clean(data.overflow === true ? '-mb-48 sm:-mb-16 md:-mb-24 xl:-mb-36' : '')}`}
        >
          <div className="col-span-full sm:col-span-3 md:col-span-5 xl:col-span-9 prose-headings:!text-skovgaard-white">
            <FadeUp>
              <div
                className="pt-4 overflow-hidden"
              >
                <Heading
                  spaceing="none"
                  alignment="left"
                  size="lg"
                  tag="h3"
                  text="balance"
                >
                  {data?.title}
                </Heading>
              </div>
            </FadeUp>
            {data?.tagline ? (<Paragraph>{data?.tagline}</Paragraph>) : null}
          </div>
          <div className="col-start-1 -col-end-1 sm:col-start-5 md:col-start-7 xl:col-start-15">
            <div className="space-y-8 text-skovgaard-white text-regular">
              {data?.body && (
                <Paragraph isPortableText>
                  {data?.body}
                </Paragraph>
              )}
              {data?.link?.label && (
                <Button link={data.link}>
                  <span>{data?.link?.label}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>
      {clean(data?.design?.color?.color) === 'default' &&
        data?.design?.padding?.spacingBottom === 'none' && (
          <div className="h-36 col-span-full bg-primary/10"></div>
        )}
    </>
  )
}

export default CallToAction
