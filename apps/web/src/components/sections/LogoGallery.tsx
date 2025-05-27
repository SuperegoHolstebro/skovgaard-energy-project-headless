import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import Photo from '../atoms/Photo'

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

const LogoGallery = ({ data }) => {
  return (
    <Section data={data} className="bg-superego-green">
      <div className="col-span-full">
        <Heading size="xl" className="mb-4">
          {data.title}
        </Heading>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 bg-white shadow-lg col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row rounded-2xl">
        {data.images.map((image, index) => (
          <div className="aspect-w-7 aspect-h-5" key={index}>
            <Photo image={image} />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoGallery
