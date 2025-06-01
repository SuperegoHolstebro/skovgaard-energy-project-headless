import React from 'react'
import Heading from '../atoms/Heading'
import Media from '../organisms/Media'
import Section from '../sections/Section'
import Paragraph from '../atoms/Paragraph'
import { clean } from '@repo/utils/sanitize'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero3 />
 * @alias: Hero3
 * @summary: Denne komponent bruges til at vise en hero.
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

interface HeroProps {
  data?: any
}

const Hero3: React.FC<HeroProps> & { Content: React.FC<{ data: any }> } = ({ data, ...props }) => {
  const AllNull =
    data.MediaObject?.media.imageObject == null &&
    data.MediaObject?.media.videoObject == null &&
    data.MediaObject?.media.vimeoObject == null

  const Colors =
    clean(data?.design?.color?.color) === 'mørk'
      ? 'bg-superego-dark'
      : clean(data?.design?.color?.color) === 'lilla'
        ? 'bg-superego-purple'
        : 'bg-superego-green '

  return (
    <>
      <Section
        {...props}
        data-theme={clean(data?.design?.color?.color)}
        className="max-h-screen pt-40 md:pt-30 "
        paddingTop="none"
        paddingBottom="none"
      >
        {/* Content Wrapper for Heading and Paragraph */}
        <Hero3.Content data={data} />

        {/* Background Color Setup */}
        <div
          className={` ${Colors} ${AllNull ? 'h-[calc(100vh/2.8)] sm:h-screen/3 md:h-[calc(100vh/2.8)] ' : 'h-screen/1.6 md:h-screen/1.5'} col-span-full absolute top-0 right-0 w-full`}
        />

        {AllNull ? null : (
          <>
            <div className="col-span-full rounded-xl relative z-100 overflow-hidden h-screen/1.6 md:h-screen/1.3">
              <Media
                data={data?.MediaObject?.media}
                showInPopup={true}
                photo={{
                  aspectRatio: '16/9',
                  className: 'relative z-100',
                  lqip: true,
                  fetchPriority: 'high',
                  sizes: '(min-width: 45em) 40vw, 100vw',
                }}
              />
            </div>
          </>
        )}
      </Section>
    </>
  )
}

export default Hero3
Hero3.Content = Content

function Content({ data }: { data: any }) {
  return (
    <div className="z-30 w-full text-superego-light-base col-span-full max-w-prose md:max-w-[80ch] prose-headings:text-superego-green">
      <Paragraph spacing="small">{data?.subtitle}</Paragraph>
      <Heading spacing="small" tag="h1" size="2xl" text="balance">
        {data.title}
      </Heading>
    </div>
  )
}
