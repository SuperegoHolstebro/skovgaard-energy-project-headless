import React from 'react'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { useLoadPage } from '@/hooks/UseLoadPage'
import { ARTICLE_QUERY } from '@repo/groq/documents/article.query'
import { metaData } from '@repo/utils/src/metadataUtils'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@repo/groq/documents/siteSettings.query'
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
      <pre>
        {JSON.stringify(page, null, 2)}
      </pre>
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const locale = (await params).locale
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', ARTICLE_QUERY)
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {
    locale: locale,
  })
  return metaData({ locale }, page, settings)
}
