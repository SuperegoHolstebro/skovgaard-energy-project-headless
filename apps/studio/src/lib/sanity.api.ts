export const useCdn = false

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET',
)
const theprojectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const projectId = assertValue(
  theprojectId,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const readToken = {
  reddap: process.env.SANITY_STUDIO_READ_TOKEN_REDDAP,
  idomlund: process.env.SANITY_STUDIO_READ_TOKEN_IDOMLUND,
  ramme: process.env.SANITY_STUDIO_READ_TOKEN_RAMME,
  nordvestjylland: process.env.SANITY_STUDIO_READ_TOKEN_NORDVESTJYLLAND,
}

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.SANITY_API_VERSION || '2023-09-01'

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
