import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/atoms/Heading'
import Section from '@/components/sections/Section'
import { Button } from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'
import Icon from '@/components/atoms/Icons'
import Photo from '@/components/atoms/Photo'

const ComparisonSlider = ({ data }) => {
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const [isResizing, setIsResizing] = useState(false)
  const topImageRef = useRef(null)
  const handleRef = useRef(null)

  const setPositioning = useCallback((x) => {
    if (topImageRef.current && handleRef.current) {
      const { left, width } = topImageRef.current.getBoundingClientRect()
      const handleWidth = handleRef.current.offsetWidth

      if (x >= left && x <= width + left - handleWidth) {
        handleRef.current.style.left = `${((x - left) / width) * 100}%`
        topImageRef.current.style.clipPath = `inset(0 ${100 - ((x - left) / width) * 100}% 0 0)`
      }
    }
  }, [])

  const handleResize = useCallback(
    (e) => {
      if (e.clientX) {
        setPositioning(e.clientX)
      } else if (e.touches[0]?.clientX) {
        setPositioning(e.touches[0].clientX)
      }
    },
    [setPositioning],
  )

  useEffect(() => {
    if (topImageRef.current && handleRef.current) {
      const { left, width } = topImageRef.current.getBoundingClientRect()
      const handleWidth = handleRef.current.offsetWidth
      setPositioning(width / 2 + left - handleWidth / 2)
    }
  }, [setPositioning])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
    window.removeEventListener('mousemove', handleResize)
    window.removeEventListener('touchmove', handleResize)
    window.removeEventListener('mouseup', handleResizeEnd)
    window.removeEventListener('touchend', handleResizeEnd)
  }, [handleResize])

  const onKeyDown = useCallback(
    (e) => {
      if (handleRef.current && handleRef.current.offsetParent) {
        const { offsetLeft, offsetParent } = handleRef.current
        if (e.code === 'ArrowLeft') {
          setPositioning(offsetLeft + offsetParent.offsetLeft - 40)
        } else if (e.code === 'ArrowRight') {
          setPositioning(offsetLeft + offsetParent.offsetLeft + 40)
        }
      }
    },
    [setPositioning, handleRef],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize)
      window.addEventListener('touchmove', handleResize)
      window.addEventListener('mouseup', handleResizeEnd)
      window.addEventListener('touchend', handleResizeEnd)
    }
    return () => {
      window.removeEventListener('mousemove', handleResize)
      window.removeEventListener('touchmove', handleResize)
      window.removeEventListener('mouseup', handleResizeEnd)
      window.removeEventListener('touchend', handleResizeEnd)
    }
  }, [isResizing, handleResize, handleResizeEnd])

  return (
    <>
      <Section
        className="relative px-0 xs:px-0 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52"
        paddingTop={data?.design?.padding?.spacingTop}
        paddingBottom={data?.design?.padding?.spacingBottom}
        variant={data?.design?.color?.color}
        paddingX="none"
      >
        <div className="px-4 mb-8 col-span-full md:col-span-6 xl:col-span-12 xs:px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0">
          <motion.div
            className="h-full pt-4 overflow-hidden"
            whileInView={{ opacity: 1, y: 0 }} // Specify the animation here
            initial={{ opacity: 0, y: 150 }} // Initial state before the element is in view
            transition={{
              duration: 0.3,
              delay: 0.15,
              ease: [0.65, 0.05, 0, 1],
            }} // Transition settings for the animation
          >
            <Heading
              tag={data.heading.heading.tag}
              spaceing="none"
              text="balance"
              type={data.heading.heading.tag}
            >
              {data.heading.heading.heading}
            </Heading>
          </motion.div>
        </div>
        <div className="row-end-4 px-4 pt-8 mb-8 xs:px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0 col-span-full md:col-span-6 xl:col-span-12 md:ml-auto md:mt-auto md:row-end-auto">
          <motion.div
            className="w-full overflow-hidden"
            whileInView={{ opacity: 1, y: 0 }} // Specify the animation here
            initial={{ opacity: 0, y: 150 }} // Initial state before the element is in view
            transition={{
              duration: 0.3,
              delay: 0.3,
              ease: [0.65, 0.05, 0, 1],
            }} // Transition settings for the animation
          >
            <Button link={data.link} variant="outline">
              <span>{data.link.label}</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1 }}
          className="relative my-auto h-screen/1.7 md:h-screen/1.2 overflow-hidden md:rounded-md shadow-xl col-span-full before:z-40 before:absolute before:size-full before:bg-gradient-to-b before:from-skovgaard-dark/0 before:to-skovgaard-dark/40 before:pointer-events-none"
        >
          <div
            ref={topImageRef}
            className="absolute top-0 z-10 w-full h-full overflow-hidden"
          >
            <Photo
              className="h-full select-none"
              image={data?.slides?.[0].image}
            />
          </div>
          <div
            ref={handleRef}
            className={`absolute top-0 z-10 w-1.5 h-full my-auto overflow-x-visible overflow-y-visible cursor-col-resize z-40 group hover:animate-none ${isMouseDown ? '' : 'animate-pulse'}`}
            onMouseDown={() => setIsResizing(true)}
            onTouchStart={() => setIsResizing(true)}
          >
            <span
              className={`absolute top-0 mx-auto left-1/5 -translate-x-1/3 w-1.5 h-full my-auto overflow-x-visible overflow-y-visible bg-secondary cursor-col-resize hover:animate-none `}
            ></span>
            <span
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className={`absolute grid mx-auto my-auto -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 bg-secondary size-19 isolate place-content-center hover:animate-none`}
            >
              <span className="absolute inline-flex items-center justify-center invisible gap-3 px-3 py-1 transition-all duration-300 ease-in-out rounded-sm rounded shadow opacity-0 -bottom-1/3 text-nowrap right-full h-7 bg-skovgaard-white group-hover:visible group-hover:opacity-100">
                <span className="text-xs font-medium leading-tight text-primary">
                  Træk i slideren
                </span>
              </span>
              <Icon type="ExpandHorizontal" />
            </span>
          </div>
          <div className="h-full overflow-hidden">
            <Photo
              className="h-full select-none"
              image={data?.slides?.[1].image}
            />
          </div>
          <div className="absolute z-50 grid w-full h-full grid-cols-2 gap-4 translate-x-1/2 -translate-y-1/2 pointer-events-none prose-headings:!text-skovgaard-white text-skovgaard-white top-1/2 right-1/2 col-span-full">
            <div className="p-4 mt-auto mr-auto md:p-6 prose-headings:!text-skovgaard-white">
              <Heading
                tag="h3"
                spaceing="none"
                text="balance"
                type="h3"
                className="!text-regular !font-medium md:!text-large md:!leading-tight md:!font-semibold md:!font-heading md:!tracking-tight"
              >
                {data.slides?.[0]?.year}
              </Heading>
              <div className="!text-small md:!text-regular">
                <Paragraph spacing="none">
                  {data.slides?.[0]?.subtitle}
                </Paragraph>
              </div>
            </div>
            <div className="p-4 mt-auto ml-auto text-right md:p-6">
              <Heading
                tag="h3"
                spaceing="none"
                text="balance"
                type="h3"
                className="!text-regular !font-medium md:!text-large md:!leading-tight md:!font-semibold md:!font-heading md:!tracking-tight"
              >
                {data.slides?.[1]?.year}
              </Heading>
              <div className="!text-small md:!text-regular">
                <Paragraph spacing="none">
                  {data.slides?.[1]?.subtitle}
                </Paragraph>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  )
}

export default ComparisonSlider
