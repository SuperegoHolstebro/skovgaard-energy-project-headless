import '../../styles/global.css';
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@repo/utils/src/lib/sanity.live'
import { client } from '@repo/utils/src/lib/sanity.client'
import Script from 'next/script'
import Appconfig from '@repo/utils/src/superego.config'
import { Montserrat } from 'next/font/google'
import { SITE_SETTINGS_QUERY } from '@repo/groq/documents/siteSettings.query'
import localFont from 'next/font/local'

const Skovgaard_Display = localFont({ src: '../Skovgaard-Display.woff2', variable: '--font-family-skovgaard' })

const heading = Montserrat({
  variable: '--font-family-heading',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
    <html lang={locale} className={` ${Skovgaard_Display.variable} ${heading.variable}`}>
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
