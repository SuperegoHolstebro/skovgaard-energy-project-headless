import { defineLive } from 'next-sanity'
import { client } from './sanity.client'
import { getCurrentProjectToken } from '../hooks/projectTokens'

// Get the current project's token
const token = getCurrentProjectToken()

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})
