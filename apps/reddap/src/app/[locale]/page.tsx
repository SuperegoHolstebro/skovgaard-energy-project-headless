import React from 'react'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@repo/utils/src/metadataUtils'
import { useLoadPage } from '@/hooks/UseLoadPage'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@repo/groq/documents/siteSettings.query'

export default async function IndexRoute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale
  const page = await useLoadPage('/', locale)
  if (!page) {
    notFound()
  }
  return (
    <PageContainer>
      {page.pageBuilder && (
        <PageBuilder documentId={page._id} documentType={page._type} sections={page.pageBuilder} />
      )}
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale

  const page = await useLoadPage('/', locale)
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {
    locale: locale,
  })

  return metaData({ locale }, page, settings)

}
