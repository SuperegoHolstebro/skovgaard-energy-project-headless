import { Metadata } from 'next'
import { clean } from './sanitize'
import Appconfig from './superego.config'
import { SITE_SETTINGS_QUERY } from '@repo/groq/documents/siteSettings.query'

export interface SeoGroup {
  seoTitle?: string
  seoDescription?: string
  radioField: 'public' | 'private' | 'hidden'
  seoImage?: {
    asset: {
      url: string
    }
  }
}

interface Page {
  title?: string
  seoGroup?: SeoGroup
  mainImage?: {
    asset: {
      url: string
    }
  }
}

export async function metaData(
  params: { locale: string },
  page: Page | null,
  settings,
): Promise<Metadata> {
  const DEFAULT_TITLE = 'Siden kunne ikke findes'
  const DEFAULT_DESCRIPTION = 'Siden du leder efter kunne ikke findes'

  if (!page) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }

  const { seoGroup, title } = page
  const seoTitle = clean(seoGroup?.seoTitle || title || settings?.siteTitle || DEFAULT_TITLE)
  const seoDescription = clean(
    seoGroup?.seoDescription || settings?.siteDescription || DEFAULT_DESCRIPTION,
  )
  const image = seoGroup?.seoImage?.asset?.url || page?.mainImage?.asset?.url
  const seoImage = image ? [{ url: image }] : []
  const googleID = clean(settings?.googleTagManager?.verification)

  const hreflangs = Appconfig.i18n.locales.map((locale) => ({
    rel: 'alternate',
    href: `/${locale.id}`, // Construct URL for each locale
    hreflang: locale.id,
  }))

  return {
    metadataBase: new URL(Appconfig.fullWebsiteUrl),
    title: seoTitle,
    description: seoDescription,
    robots: {
      ...(page.seoGroup?.radioField === 'hidden' && {
        index: false,
        follow: false,
      }),
      ...(page.seoGroup?.radioField === 'private' && {
        index: false,
        follow: true,
      }),
      ...(page.seoGroup?.radioField === 'public' && {
        index: true,
        follow: true,
      }),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      ...(seoImage.length && { images: seoImage }),
      locale: params.locale,
      url: Appconfig.fullWebsiteUrl,
      type: 'website',
      alternateLocale: Appconfig.i18n.locales.map((locale) => locale.id),
      siteName: settings?.siteTitle || Appconfig.siteTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      ...(seoImage.length && { images: seoImage }),
      site: Appconfig.fullWebsiteUrl,
      images: seoImage,
    },
    verification: {
      google: googleID,
    },
    creator: 'Superego Holstebro',
    other: {
      'theme-color': '#000000',
    },
    alternates: {
      languages: hreflangs.reduce((acc, lang) => {
        acc[lang.hreflang] = lang.href
        return acc
      }, {}),
    },
  }
}
