import { defineLive } from 'next-sanity'
import { client } from './sanity.client'
import { readToken } from './sanity.api'
const idomlundToken = readToken.idomlund
const nordvestjyllandToken = readToken.nordvestjylland
const rammeToken = readToken.ramme
const reddapToken = readToken.reddap

const token = idomlundToken || nordvestjyllandToken || rammeToken || reddapToken

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})
