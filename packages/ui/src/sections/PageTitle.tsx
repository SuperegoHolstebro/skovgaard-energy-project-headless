import React from 'react'
import Section from './Section'
import { motion } from 'framer-motion'
import { Button } from '../atoms/Button'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import { FadeUp } from '../interactions/AnimateFadeIn'

const PageTitle = ({ data }: any) => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <Section variant={'quaternary'}
      className="h-auto block md:!grid md:min-h-[calc(100vh/1.7)] xl:min-h-[calc(100vh/1.5)]/ pt-40 md:pt-32 relative"
      paddingTop="none"
      paddingBottom="none"
    >
      <div className="col-start-1 mt-auto -col-end-1 md:col-end-7 lg:col-end-8 xl:col-end-8 2xl:col-end-8">
        <FadeUp>
          <Heading tag="h1" size="xl" spaceing="none">
            {data.title}
          </Heading>
        </FadeUp>
      </div>
      <div className="pt-4 overflow-hidden col-start-1 md:mt-auto -col-end-1 md:-col-start-6 md:-col-end-1 xl:-col-start-10 xl:-col-end-1">
        <FadeUp
          delay={0.3}>
          <Paragraph size="regular" weight="medium" spacing="none">
            {data.description}
          </Paragraph>
        </FadeUp>
      </div>
      <div
        className="col-start-1 overflow-hidden -col-end-1 md:col-end-7 lg:col-end-8 xl:col-end-15 2xl:col-end-14"
      >
        {data?.buttons?.length > 0 ? (
          <FadeUp delay={0.3}>
            <div className="flex flex-col flex-wrap gap-3 pt-10 md:flex-row md:pt-16 ">
              {data?.buttons?.map((button: any, index: number) => (
                <React.Fragment key={index}>
                  {button?.link?.label && (
                    <Button link={button?.link} variant={button?.style}>
                      <span>{button?.link?.label}</span>
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeUp>
        ) : null}
      </div>
      <button
        className="absolute right-0 hidden mx-4 bottom-12 brightness-50 md:block size-14"
        onClick={handleClick}
      >
        {/* <DotLottieReact src="/scroll.json" loop autoplay /> */}
      </button>
    </Section>
  )
}

export default PageTitle
