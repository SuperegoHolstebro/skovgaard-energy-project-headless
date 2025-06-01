import React from 'react'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@repo/utils/metadataUtils'
import { draftMode } from 'next/headers'
import { ARTICLE_QUERY } from '@repo/groq/documents/article.query'
import TextContainer from '@repo/ui/sections/textContainer'
import { formatDate } from '@repo/utils/date'
import { useLoadPage } from '@repo/utils/hooks/useLoadPage'
import Section from '@repo/ui/sections/Section'
import Heading from '@repo/ui/atoms/Heading'
import Paragraph from '@repo/ui/atoms/Paragraph'

export interface Params {
  slug: string[]
  locale: string
}

export default async function DynamicRoute({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params // Await the Promise
  const slug = `${resolvedParams.slug.join('/')}`
  const page = await useLoadPage(slug, 'da', ARTICLE_QUERY)

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
          tag={'div'}
        >
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading size="xs" tag="p" spacing="default">
              {page.date ? formatDate(page.date) : ''}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <img src={page.image.asset.url} className="h-full object-cover max-h-screen/1.6 w-full" />
        </div>
      </Section>
      <TextContainer variant="default">
        <Paragraph isPortableText>{page.body}</Paragraph>
      </TextContainer>
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const locale = (await params).locale
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', ARTICLE_QUERY)

  return metaData({ locale }, page)
}
