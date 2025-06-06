import { headers } from 'next/headers.js'

// Token mapping - centralized in one place
export const TOKEN_MAP = {
  reddap: process.env.SANITY_STUDIO_READ_TOKEN_REDDAP,
  idomlund: process.env.SANITY_STUDIO_READ_TOKEN_IDOMLUND,
  ramme: process.env.SANITY_STUDIO_READ_TOKEN_RAMME,
  nordvestjylland: process.env.SANITY_STUDIO_READ_TOKEN_NORDVESTJYLLAND,
}

// Get token by project ID
export const getTokenByProject = (projectId: keyof typeof TOKEN_MAP) => {
  return TOKEN_MAP[projectId] || null
}

// Get current project ID from environment
export const getCurrentProjectId = () => {
  return process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'reddap'
}

// Get current project ID from domain (if you need this)
export const getProjectFromDomain = async () => {
  const headersList = await headers()
  const host = headersList.get('host') as string | null

  const domainMap: Record<string, keyof typeof TOKEN_MAP> = {
    'reddap.dk': 'reddap',
    'idomlund.dk': 'idomlund',
    'ramme.dk': 'ramme',
    'nordvestjylland.dk': 'nordvestjylland',
  }

  return host && domainMap[host] ? domainMap[host] : getCurrentProjectId()
}

// Get current project token (combines the above)
export const getCurrentProjectToken = () => {
  const projectId = getCurrentProjectId()
  return getTokenByProject(projectId as keyof typeof TOKEN_MAP)
}

// Get current project token with domain detection
export const getCurrentProjectTokenFromDomain = async () => {
  const projectId = await getProjectFromDomain()
  return getTokenByProject(projectId as keyof typeof TOKEN_MAP)
}

// Updated sanity.api.js exports
export const readToken = getCurrentProjectToken()

// Or if you need dynamic domain-based detection:
// export const readToken = await getCurrentProjectTokenFromDomain() // Note: this would need to be called in async contexts
