import React from 'react'
import InnerBlocks from '../molecules/InnerBlocks'
import Section from '../sections/Section'
import { TextWithIllustrationProps } from '../types/TextWithIllustration.types'
import Media from '../organisms/Media'

/**
 *
 * @returns: En sektion med tekst og illustration.
 * @example: <TextWithIllustration />
 * @alias: TextWithIllustration
 * @summary: Denne komponent bruges til at vise en sektion med tekst og illustration.
 * @version: 1.0.0
 * @property: [data]
 * @todo: implementer bedre håndtering af innerBlocks
 * @author: Kasper Buchholtz
 *
 **/
const TextWithIllustration = ({ data, flip = false }: TextWithIllustrationProps) => {
  const marginOne =
    '-mx-4 md:-mr-3 md:mx-0 md:-ml-24  2xl:-ml-52 xl:-ml-36 '
  const marginTwo =
    '-mx-4 md:mx-0 md:-mr-24  md:-ml-3 xl:-mr-36 2xl:-mr-52'
  return (
    <>
      <Section data={data} className="overflow-hidden">
        {data?.flip ? (
          <>
            <div
              className={`${marginOne} *:w-full max-h-screen/1.2 relative h-auto block col-start-1 -col-end-1 md:col-start-1 md:flex md:-col-end-7 xl:col-start-1 xl:col-end-13 2xl:col-start-1 2xl:col-end-13  ${flip ? '' : ''}`}
            >
              <Media showInPopup data={data?.MediaObject?.media} />
            </div>
            <div className="col-start-1 -col-end-1 md:-col-start-1 md:col-end-8 lg:-col-start-1 xl:-col-end-12 ">
              <InnerBlocks index={2} blocks={data.innerBlocks} />
            </div>
          </>
        ) : (
          <>
            <div
              className={` ${marginTwo} *:w-full max-h-screen/1.2 relative h-auto block col-start-1 -col-end-1 md:-col-start-1 md:flex md:col-end-7 xl:-col-start-1 xl:-col-end-13 2xl:-col-start-1 2xl:-col-end-13 ${flip ? 'md:flex-row-reverse' : ''}`}
            >
              <Media showInPopup data={data?.MediaObject?.media} />
            </div>
            <div className="col-start-1 -col-end-1 md:col-start-1 md:row-start-1 md:col-end-6 lg:col-start-1 xl:col-end-12">
              <InnerBlocks index={1} blocks={data.innerBlocks} />
            </div>
          </>
        )}
      </Section>
    </>
  )
}

export default TextWithIllustration
