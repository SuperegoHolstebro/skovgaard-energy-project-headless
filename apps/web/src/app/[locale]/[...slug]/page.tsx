import React from 'react'
import { useLoadPage } from '@/hooks/useLoadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@/utils/metadataUtils'
import { Params } from '../artikler/[...slug]/page'
import { draftMode } from 'next/headers'

export interface PageParams {
  params: Promise<Params>
}

export default async function DynamicRoute({ params }: PageParams) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, locale)

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
  const page = await useLoadPage(slug, 'da')

  return metaData({ locale }, page)
}
