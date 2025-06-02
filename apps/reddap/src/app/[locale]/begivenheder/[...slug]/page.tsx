import React from 'react'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@repo/utils/metadataUtils'
import Section from '@repo/ui/src/sections/Section'
import Heading from '@repo/ui/src/atoms/Heading'
import Paragraph from '@repo/ui/src/atoms/Paragraph'
import { formatDate } from '@repo/utils/date'
import { urlFor } from '@repo/utils/lib/sanity.image'
import Image from 'next/image'
import { Params } from '../../artikler/[...slug]/page'
import { draftMode } from 'next/headers'
import { EVENT_QUERY } from '@repo/groq/documents/event.query'
import { useLoadPage } from '@/sanity/UseLoadPage'

export default async function DynamicRoute({ params }: { params: Promise<Params> }) {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', EVENT_QUERY)

  if (!page) {
    notFound()
  }

  if (page.seoGroup?.radioField === 'hidden') {
    if (!(await draftMode()).isEnabled) {
      notFound()
    }
  }
  return (
    <PageContainer>
      <Section
        variant="default"
        paddingTop="none"
        paddingX="none"
        paddingBottom="none"
        className="h-screen/1.6"
      >
        <Section
          paddingBottom="none"
          className="order-2 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-1 md:my-auto"
          tag="div"
        >
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading size="xs" tag="h6" spacing="default">
              {formatDate(page.date ?? '')}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <Image
            className="object-cover h-full"
            src={urlFor(page.image).dpr(2).url()}
            alt=""
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(page.image).width(24).height(24).blur(10).url()}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>
      </Section>

      {page.pageBuilder && (
        <PageBuilder documentId={page._id} documentType={page._type} sections={page.pageBuilder} />
      )}
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const locale = (await params).locale
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', EVENT_QUERY)

  return metaData({ locale }, page)
  return metaData({ locale }, page)
}
