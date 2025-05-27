'use client'
import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../organisms/Carousel'
import Photo from '../atoms/Photo'

const LogoGallery2 = ({ data }) => {
  return (
    <Section data={data}>
      <div className="col-span-full">
        <Heading size="xl" className="mb-4">
          {data.title}
        </Heading>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="col-span-full"
      >
        <CarouselContent>
          {data.images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
              <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-12">
                <Photo image={image} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  )
}

export default LogoGallery2
