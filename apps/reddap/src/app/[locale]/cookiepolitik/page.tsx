'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import Header from '@repo/ui/src/organisms/Header'

export default function Cookie() {
  useEffect(() => {
    return () => {
      const elements = document.querySelectorAll('#coitable')
      elements.forEach((el) => el.remove())
    }
  }, [])

  return (
    <>
      <Header logoVariant='SkovgaardEnergy' />
      <Script
        className="cookie-policy-content"
        id="CookiePolicy"
        src="https://policy.app.cookieinformation.com/cid.js"
        data-culture="DA"
        type="text/javascript"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Cookie script loaded successfully')
        }}
      />
    </>
  )
}
