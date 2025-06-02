"use client"
import Section from './Section'
import Icon from '../atoms/Icons'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import Paragraph from '../atoms/Paragraph'
import Heading from '../atoms/Heading'
import { FadeUp } from '../interactions/AnimateFadeIn'
import { clean } from '@repo/utils/sanitize'

interface DataTypeSection {
  data?: any
}

const DataType = ({ data }: DataTypeSection) => {
  return (
    <Section data={data}>
      <div className="h-full col-start-1 -col-end-1 sm:col-end-5 md:col-end-6 xl:col-end-8">
        <div className="sm:sticky top-28 xl:top-36">
          <FadeUp delay={0.325}>
            <div className="pt-4 overflow-hidden">
              <Heading
                text="balance"
                data={data.heading}>
                {data.heading.text}
              </Heading>
            </div>
          </FadeUp>
        </div>
      </div>
      <ul className="col-start-1 sm:col-start-5 md:col-start-7 lg:col-start-8 xl:col-start-9 -col-end-1 space-y-1.5">
        {data?.dataBox?.map((dataObject: any, index: number) => {
          return (
            <DataTypeListItem key={index} data={dataObject} index={index} />
          )
        })}
        {data?.link?.link?.label && (
          <FadeUp>
            <div className='text-regular'>
              <Button variant={clean(data?.link?.style) as any} className='w-full' link={data?.link?.link}>
                {data?.link?.link?.label}

              </Button>
            </div>
          </FadeUp>
        )}
      </ul>
    </Section>
  )
}

export default DataType




function DataTypeListItem({ data, index }: any) {
  return (
    <li>
      <FadeUp delay={index * 0.1}>
        <div className='flex flex-col gap-8 p-8 rounded-md md:flex-row prose-headings:text-primary text-primary bg-skovgaard-dark/10'>
          <div className="relative mx-auto md:mx-0">
            <Icon
              className="fill-skovgaard-mørk size-10"
              type={clean(data.icon)}
            />
          </div>
          <div className="space-y-2 text-center md:text-left md:pr-10 lg:pr-12">
            <Heading spaceing="none" size="md" tag="h4">
              {data.heading}
            </Heading>
            <Paragraph isPortableText>{data.body}</Paragraph>
            {data?.link?.url && (
              <div className="mx-auto max-w-fit md:mx-0">
                <Button className="group" variant="none">
                  <Link
                    title={data?.link?.label}
                    target={data?.link?.blank ? '_blank' : '_self'}
                    href={data?.link?.url || '/'}
                  >
                    {data?.link?.label}
                    <span className="relative overflow-hidden size-5 ">
                      <Icon
                        type="ArrowRight"
                        className="absolute transition-all duration-500 ease-custom translate-x-1/2 -translate-y-1/2 group-hover:translate-x-1/2 top-1/2 group-hover:-right-1/2 right-1/2 fill-primary size-5"
                      />
                      <Icon
                        type="ArrowRight"
                        className="absolute transition-all duration-500 ease-custom -translate-x-1/2 -translate-y-1/2 group-hover:translate-x-1/2 top-1/2 right-1/2 fill-primary size-5"
                      />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

      </FadeUp>
    </li>
  )
}