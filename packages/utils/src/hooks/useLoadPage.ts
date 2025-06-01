import type { QueryParams } from 'next-sanity'
import type { UnfilteredResponseQueryOptions } from '@sanity/client'
import { draftMode } from 'next/headers'
import 'server-only'
import { SeoGroup } from '../metadataUtils'
import { PAGE_QUERY } from '@repo/groq/documents/page.query'

import { getTokenByProject, getCurrentProjectId } from './projectTokens'
import { sanityFetch } from '../lib/sanity.live'

export type PagePayload = {
  image?: any
  _id?: string
  _type: string
  slug: { current: string }
  title?: string
  body?: any
  pageBuilder: any[]
  seoGroup: SeoGroup
  description?: string
  date?: string
  localeInfo: {
    locale?: string
    _translations?: {
      title?: string
      slug?: { current: string }
      locale?: string
    }[]
  }
}

const DEFAULT_PARAMS = {} as QueryParams

export async function loadQuery<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  projectId,
}: {
  query: string
  params?: QueryParams
  groqQuery?: string
  projectId?: string
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled
  const currentProjectId = projectId || getCurrentProjectId()

  const token = getTokenByProject(currentProjectId)

  if (isDraftMode && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.')
  }

  const perspective = isDraftMode ? 'drafts' : 'published'

  const options = {
    filterResponse: false,
    useCdn: false,
    resultSourceMap: isDraftMode ? 'withKeyArraySelector' : false,
    token: isDraftMode ? token : undefined,
    perspective,
    next: {
      tags: ['sanity'],
      revalidate: isDraftMode ? 0 : 60,
    },
  } satisfies UnfilteredResponseQueryOptions

  /* @deprecated
  const result = await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as UnfilteredResponseQueryOptions)
  return result.result
 */

  const result = await sanityFetch({
    query,
    params,
    ...options,
  })
  return result.data
}

export async function useLoadPage(slug: string, locale: string, groqQuery?: string) {
  return loadQuery<PagePayload | null>({
    query: groqQuery || PAGE_QUERY,
    params: { slug, locale },
  })
}
