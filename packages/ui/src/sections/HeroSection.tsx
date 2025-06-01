'use client'

import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'

const Hero = ({ data }: any) => {
  const slideshowRef = useRef(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const contentRef = useRef(null)
  const InfoRef = useRef(null)
  const AppearRef = useRef(null)
  const slideshowWrapperRef = useRef(null)

  useEffect(() => {
    const isReturningVisitor = localStorage.getItem('returningVisitor')

    // Set the animation speed: normal for first-time visitors, faster for returning visitors
    const animationSpeed = isReturningVisitor ? 1 : 2

    // If it's the first visit, set the localStorage item
    if (!isReturningVisitor) {
      localStorage.setItem('returningVisitor', 'true')
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(slideshowRef.current, {
          width: window.innerWidth < 1024 ? '100%' : '33.3333%',
          height: window.innerWidth < 1024 ? '33%' : '100%',
          duration: animationSpeed,
          ease: 'power2.inOut',
        })
        gsap.from(contentRef.current, {
          opacity: 0,
          x: '-100%',
          duration: animationSpeed,
          ease: 'power2.inOut',
          delay: 0.1,
        })

        gsap.from(InfoRef.current, {
          opacity: 0,
          x: '-100%',
          duration: 2,
          ease: 'power2.inOut',
          delay: isReturningVisitor ? 0.5 : 1,
        })

        gsap.from(AppearRef.current, {
          y: 150,
        })
      },
    })

    data.images.forEach((_: any, index: number) => {
      const imgEl = imagesRef.current[index]
      if (imgEl) {
        timeline
          .to(imgEl, {
            ease: 'power2.in',
            opacity: 1,
            duration: 0.15,
            delay: 0, // Initial delay only for the first image
          })
          .to(imgEl, {
            ease: 'power2.in',
            opacity: 1,
            duration: 0.15,
            delay: 0,
          })
      }
    })

    const handleResize = () => {
      gsap.to(slideshowRef.current, {
        height: window.innerWidth < 1024 ? '33%' : '100%',
        width: window.innerWidth < 1024 ? '100%' : '33.3333%',
        duration: 2,
        ease: 'power2.inOut',
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      timeline.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [data.images])

  return (
    <>
      <Section
        paddingBottom="none"
        className="min-h-screen pt-16 pt-20 pb-4 overflow-hidden grid-rows-[repeat(3,_minmax(auto,_1fr))] sm:grid-rows-3 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-32 2xl:pt-32 md:h-screen md:max-h-max "
      >
        <div
          ref={slideshowWrapperRef}
          className="relative w-full h-full mr-auto overflow-hidden rounded-md col-span-full row-span-full"
        >
          <div
            ref={slideshowRef}
            className="w-full h-full ml-auto rounded-md md:aspect-w-[17] md:aspect-h-9 shadow-md"
          >
            {data?.images?.map((image: any, index: number) => (
              <Image
                ref={(el) => {
                  imagesRef.current[index] = el
                }}
                key={index}
                src={image.image}
                alt={`Hero Image ${image.asset?._id}`}
                layout="fill"
                className="rounded-md !h-[inherit] !w-[inherit] ml-auto "
                objectFit="cover"
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              />
            ))}
          </div>
        </div>
        <div
          ref={contentRef}
          className="flex flex-col justify-end h-full row-start-2 row-end-2 md:mt-12 col-span-full xl:col-start-2 xl:-col-end-11 md:-col-end-6 md:col-start-1 md:row-start-2 "
        >
          <div className="space-y-6 sm:max-w-full  md:max-w-xl md:ml-auto xl:max-w-2xl md:text-right !w-full -mb-12 ">
            <Heading
              text="balance"
              spaceing="none"
              size="2xl"
              tag="h1"
              className='!text-secondary'
              hyphens="manual"
            >
              {data.heading}
            </Heading>
            <div className="ml-auto">
              <Paragraph size="regular">{data.tagline}</Paragraph>
            </div>
          </div>
        </div>
        <div
          ref={InfoRef}
          className="row-start-3 mb-2 xl:mt-auto md:mt-auto col-span-full xl:col-start-2 xl:-col-end-11 md:-col-end-6 md:col-start-1"
        >
          <InfoBoxes data={data} />
        </div>
      </Section>
    </>
  )
}
export default Hero

const InfoBoxes = ({ data }: any) => {
  const appearRefs = useRef<(HTMLDivElement | null)[]>([])
  const borderRef = useRef<(HTMLLIElement | null)[]>([])
  const appearRefs2 = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const isReturningVisitor = localStorage.getItem('returningVisitor')

    const animationSpeed = isReturningVisitor ? 3.5 : 3.5

    appearRefs.current.forEach((ref, index: number) => {
      gsap.from(ref, {
        y: 150,
        delay: 1,
        duration: animationSpeed,
        ease: 'power2.inOut',
      })
    })
  }, [data])

  return (
    <ul className="flex flex-col w-full divide-y-2 md:divide-y-0 xl:divide-x-2 md:flex-row divide-skovgaard-dark/20">
      {data?.infoboxes?.map((info: any, index: number) => (
        <li
          ref={(el) => (borderRef.current[index] = el) as any}
          key={index}
          className="pb-2 md:pb-0 w-full pt-10 md:pt-6 pl-0 md:pl-4 pr-0 md:pr-4 xl:pl-10 xl:pr-10 text-secondary !font-bold text-right  first:pl-0 last:pr-0 flex flex-row  md:flex-col md:items-end items-center justify-between sm:justify-normal"
        >
          <div className="mx-3 overflow-hidden md:mx-0">
            <div ref={(el) => (appearRefs.current[index] = el) as any}>
              <Heading
                size="lg"
                spaceing="none"
                fontFamily="heading"
                tag="span"
              >
                {info.heading}
              </Heading>
            </div>
          </div>
          <div
            ref={(el) => (appearRefs2.current[index] = el) as any}
            className="text-primary max-w-[15ch] sm:max-w-max"
          >
            <Paragraph className='font-normal' size="regular">
              {info.text}
            </Paragraph>
          </div>
        </li>
      ))}
    </ul>
  )
}
