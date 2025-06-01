import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Photo from '../atoms/Photo'
import Heading from '../atoms/Heading'

/**
 *
 * @returns: En sektion med en logo galleri.
 * @example: <LogoGallery />
 * @alias: LogoGallery
 * @summary: Denne komponent bruges til at vise et galleri med logoer
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

const LogoGallery = ({ data }: any) => {
  return (
    <Section
      data={data}>
      {data.title ? (
        <div className="col-span-full">
          <Heading size="xl" className="mb-4">
            {data.title}
          </Heading>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 p-4 shadow-lg bg-skovgaard-dark col-span-full xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 md:p-12 md:flex-row rounded-2xl">
        {data.images.map((image: any, index: number) => (
          <div className='aspect-w-7 aspect-h-5' key={index}>
            <Photo image={image} className='object-contain' />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoGallery
