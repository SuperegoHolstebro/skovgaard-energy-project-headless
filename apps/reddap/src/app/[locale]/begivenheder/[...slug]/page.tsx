import React from 'react'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@repo/utils/src/metadataUtils'
import { Params } from '../../artikler/[...slug]/page'
import { draftMode } from 'next/headers'
import { EVENT_QUERY } from '@repo/groq/documents/event.query'
import { useLoadPage } from '@/hooks/UseLoadPage'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@repo/groq/documents/siteSettings.query'

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
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {
    locale: locale,
  })

  return metaData({ locale }, page, settings)
}
