import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { client } from '@/sanity/lib/sanity.client'
import Script from 'next/script'
import Appconfig from '@repo/utils/src/superego.config'
import { Inter, PT_Serif } from 'next/font/google'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/documents/siteSettings.query'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = PT_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export default async function RootLayout({
  params,
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  const locale = (await params).locale || Appconfig.i18n.defaultLocaleId || 'da'

  const settings = await client.fetch(SITE_SETTINGS_QUERY, { locale })

  return (
    <html lang={locale} className={` ${sans.variable} ${serif.variable}`}>
      <head>
        <Script
          id="show-headScripts"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />
        <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      </head>
      <body>
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <SanityLive />
          </>
        )}
      </body>
    </html>
  )
}
