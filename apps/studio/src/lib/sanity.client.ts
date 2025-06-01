import { createClient, type SanityClient } from 'next-sanity'
import { readToken, apiVersion, dataset, projectId, useCdn } from './sanity.api'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: true,
      studioUrl: 'super-login',
    },
  })

  if (readToken) {
    if (!readToken) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: readToken as any,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'published',
    })
  }
  return client
}
export const client = getClient()
