import { defineLive } from 'next-sanity'
import { client } from './sanity.client'
import { readToken } from './sanity.api'
const token = readToken

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})
