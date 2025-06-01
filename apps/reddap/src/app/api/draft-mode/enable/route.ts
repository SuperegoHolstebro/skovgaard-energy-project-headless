import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@repo/utils/src/lib/sanity.client'
import { readToken } from '@repo/utils/src/lib/sanity.api'
const token = readToken
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
