import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@repo/utils/lib/sanity.client'
import { readToken } from '@repo/utils/lib/sanity.api'
const token = readToken.nordvestjylland
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
