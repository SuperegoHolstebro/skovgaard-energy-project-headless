import React from 'react'
import { useLoadPage } from '@/sanity/UseLoadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@repo/utils/metadataUtils'
import { AdvancedButton } from '@repo/ui/src/atoms/AdvancedButton'

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  return metaData({ locale }, page)
}
