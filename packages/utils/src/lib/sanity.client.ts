// Updated sanity.api.js
import {
  getCurrentProjectToken,
  getTokenByProject,
  getCurrentProjectId,
} from '../hooks/projectTokens'

// Updated getClient function
import { createClient, type SanityClient } from 'next-sanity'
import { readToken, apiVersion, dataset, projectId, useCdn } from './sanity.api'

export function getClient(preview?: { token: string }, customProjectId?: string): SanityClient {
  // Use custom project ID if provided, otherwise use default
  const currentProjectId = customProjectId || getCurrentProjectId()
  const currentToken = getTokenByProject(currentProjectId as any)

  const client = createClient({
    projectId: currentProjectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: true,
      studioUrl: 'super-login',
    },
  })

  if (preview?.token || currentToken) {
    const token = preview?.token || currentToken
    if (!token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'published',
    })
  }
  return client
}

export const client = getClient()
