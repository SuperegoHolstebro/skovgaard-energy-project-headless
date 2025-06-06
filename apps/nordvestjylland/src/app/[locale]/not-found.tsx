'use client'

import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation'
import PageContainer from '@/components/PageContainer'
import Section from '@repo/ui/src/sections/Section'
import Heading from '@repo/ui/src/atoms/Heading'
import Paragraph from '@repo/ui/src/atoms/Paragraph'
import { AdvancedButton } from '@repo/ui/src/atoms/AdvancedButton'

// Simple inline translation object


const ErrorPage: React.FC = () => {
  const locale = useParams().locale

  const translations = {
    da: {
      heading: 'Undskyld, noget gik galt',
      description:
        'Vi kan desværre ikke finde siden, du leder efter. Vend tilbage til forsiden eller få besvaret dine spørgsmål ved at kontakte os.',
      button: 'Gå til forsiden',
      slug: '/',
    },
    en: {
      heading: 'Sorry, something went wrong',
      description:
        "Unfortunately, we can't find the page you're looking for. Return to the homepage or get your questions answered by contacting us.",
      button: 'Go to frontpage',
      slug: '/en',
    },
  }

  const t = translations[locale as keyof typeof translations[]] || translations.en

  return (
    <PageContainer>
      <Section className="min-h-screen">
        <div className="my-auto text-center col-span-full">
          <Heading tag="h1" type="h1">
            {t?.heading}
          </Heading>
          <Paragraph size="regular">{t?.description}</Paragraph>
          <div className="flex justify-center gap-4 mt-8">
            <AdvancedButton variant="default">
              <Link href={t?.slug}>{t?.button}</Link>
            </AdvancedButton>
          </div>
        </div>
      </Section>
    </PageContainer >
  )
}

export default ErrorPage
