'use client'
import Section from './Section'
import React, { useRef, useState } from 'react'
import { getMonth, getYear } from '@repo/utils/date'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../atoms/Icons'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Photo from '../atoms/Photo'
import InnerBlocks from '../molecules/InnerBlocks'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../organisms/Carousel'
import { defaultOptions } from '@repo/utils/hooks/useAnimate'


const ProcessSection = ({ data }: any) => {
  const lastTrueIndex = data.processes
    .map((process: any) => process.status)
    .lastIndexOf(true)

  const [activeIndex, setActiveIndex] = useState(0)
  const [openModalIndex, setOpenModalIndex] = useState(null)
  const [innerCarouselApi, setInnerCarouselApi] = useState<any>()

  const openModal = (index: any) => {
    setOpenModalIndex(index)
  }

  const closeModal = () => {
    setOpenModalIndex(null)
  }

  const handlePrevious = () => {
    if (innerCarouselApi) {
      innerCarouselApi.scrollPrev()
    }
  }

  const handleNext = () => {
    if (innerCarouselApi) {
      innerCarouselApi.scrollNext()
    }
  }

  return (
    <>
      <Section
        paddingX="left"
        id={`${data?.SectionSettings?.anchor?.current}`}
      >
        <div className="col-span-full md:col-span-6 xl:col-span-12">
          <motion.div
            className="pt-4 overflow-hidden"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 150 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: defaultOptions.ease
            }}
          >
            <Heading spaceing="small" tag="h2" type="h2">
              {data.title}
            </Heading>
            <div className="max-w-prose">
              <Paragraph spaceing="small">{data.description}</Paragraph>
            </div>
          </motion.div>
        </div>
        <div className="flex gap-1.5 gap-6 mt-auto ml-auto col-span-full md:col-span-6 xl:col-span-12 pr-4 xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52">
          <motion.div
            className="pt-4 overflow-hidden"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 150, scale: 0.95 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: defaultOptions.ease,
            }}
          >
            {data.processes.length > 0 && (
              <div className="flex gap-1.5 justify-end">
                <span className="*:w-full">
                  <AdvancedButton
                    variant="icon"
                    size="default"
                    onClick={handlePrevious}
                  >
                    <Icon
                      className="my-auto"
                      type="chevronUp"
                    />
                  </AdvancedButton>
                </span>

                <span className="*:w-full">
                  <AdvancedButton
                    variant="default"
                    size="default"
                    onClick={handleNext}
                  >
                    <span className="hidden sm:block">Næste</span>
                    <Icon
                      className="my-auto rotate-180"
                      type="chevronUp"
                    />
                  </AdvancedButton>
                </span>
              </div>
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.65, 0.05, 0, 1] }}
          className="col-span-full"
        >
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: false,
            }}
            onSelect={(api: any) => {
              if (api && typeof api.selectedScrollSnap === 'function') {
                setActiveIndex(api.selectedScrollSnap())
              }
            }}
          >
            <CarouselContent className="-ml-4 *:overflow-visible overflow-visible">
              {data.processes.map((process: any, index: number) => (
                <CarouselItem key={index} className="pl-4">
                  <div className="flex w-full">
                    <Carousel
                      className="w-full min-h-28 h-full *:overflow-x-hidden *:overflow-visible overflow-visible"
                      opts={{
                        align: "start",
                        loop: false,
                      }}
                      setApi={(api) => setInnerCarouselApi(api)}
                    >
                      <CarouselContent className="ml-16 md:ml-0 -ml-4 h-full *:overflow-visible overflow-visible">
                        {process.processes.map((proc: any, idx: number) => (
                          <CarouselItem
                            key={idx}
                            className="pl-4 mb-4 md:mb-0 basis-auto relative min-w-44"
                          >
                            <div className="flex flex-col items-center justify-between gap-3 md:flex-row min-w-0">
                              <button
                                onClick={() => openModal(idx)}
                                className={` ${proc.status === true
                                  ? 'border-tertiary bg-tertiary'
                                  : ' border-primary hover:border-tertiary'
                                  } relative cursor-pointer rounded-full border-4 group size-10 ease-custom duration-700 transition hover:bg-tertiary hover:animate-none animate-pulse `}
                              >
                                <div
                                  className={`absolute bottom-0 invisible px-3 py-1 ease-custom transition-all translate-y-full rounded shadow-md opacity-0 bg-skovgaard-white group-hover:visible group-hover:opacity-100 z-10 right-0 text-nowrap`}
                                >
                                  <p>Klik for at få mere info</p>
                                </div>
                              </button>

                              <div
                                className={` ${!proc.date ? 'md:bottom-full bottom-0  md:translate-y-20 ' : 'md:bottom-0 bottom-1/2 '} } absolute pl-6 md:pl-0 left-full md:left-1`}
                              >
                                <Heading spacing="none" tag="p" size="p">
                                  {proc.title}
                                </Heading>
                              </div>
                              <div
                                className={`flex-grow md:h-1 h-10 w-1 md:w-auto min-w-12 ${proc.status === true && idx === lastTrueIndex ? 'bg-primary' : proc.status === true ? 'bg-tertiary' : 'bg-primary'}`}
                              ></div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="absolute right-0 z-10 -translate-y-1/2 bg-gradient-to-l from-skovgaard-white via-55% size-40 -bottom-1/2 pointer-events-none" />
                    </Carousel>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
        {data.processes.map((process: any, index: number) => (
          <React.Fragment key={index}>
            {process.processes.map((proc: any, procIndex: number) => (
              <React.Fragment key={procIndex}>
                <AnimatePresence>
                  {openModalIndex === procIndex && (
                    <Modal
                      index={procIndex}
                      data={proc}
                      closeModal={closeModal}
                    />
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Section>
    </>
  )
}
export default ProcessSection


const Modal = ({ closeModal, data }: any) => {
  return (
    <div>
      <motion.div
        className="fixed isolate inset-0 z-[99999999999] z-50 w-full h-full !mr-0"
        data-lenis-prevent="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, }}
        transition={{ duration: 0.3, ease: defaultOptions.ease }}
        exit={{ opacity: 0 }}
      >
        <AdvancedButton
          className="fixed inset-0 !w-full !h-full px-1 pt-20 bg-black/50 isolate "
          variant="none"
          onClick={closeModal}
        ></AdvancedButton>
        <motion.div
          className="fixed z-[99999999999999] px-6 inset-0 m-auto pointer-events-none px-20"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.6, ease: defaultOptions.ease }}
        >
          <div className="fixed z-[99999999999999] pointer-events-auto inset-0  m-auto bg-skovgaard-white overflow-hidden max-h-[48rem] max-w-3xl  overflow-auto md:max-w-5xl xl:max-w-7xl">
            {data?.image && (
              <div className="relative w-full h-96">
                <Photo image={data.image} />
              </div>
            )}
            <div className="px-6 pt-8">
              <div>
                <Heading tag="h3" size="lg" spaceing="none">
                  {data?.title}
                </Heading>
                <span className="opacity-50">
                  {data?.date && (
                    <span className="opacity-50">
                      {getMonth(data?.date)} &nbsp;
                      {getYear(data?.date)}
                    </span>
                  )}
                  {!data?.date && <></>}
                </span>
              </div>
              <div className="pt-2">
                <InnerBlocks blocks={data?.innerBlocks} />
              </div>
              <div className="absolute top-6 right-6">
                <AdvancedButton
                  variant="default"
                  size="default"
                  onClick={closeModal}
                >
                  x
                </AdvancedButton>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
