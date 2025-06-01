'use client'
import React from 'react'
import { sectionComponents } from '@repo/ui/sections/index'
import { createDataAttribute } from '@sanity/visual-editing'
import { useOptimistic } from '@sanity/visual-editing/react'

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
}

export function PageBuilder({
  sections: initialSections,
  documentId,
  documentType,
}: any) {
  const sections = useOptimistic<any[], any>(
    initialSections,
    (currentSections, action) => {
      if (action.id !== documentId) {
        return currentSections
      }

      if (action.document.sections) {
        return action.document.sections
      }

      return currentSections
    },
  )

  function randomKey() {
    return Math.random().toString(36).substring(7)
  }

  return (
    <main
      className="min-h-screen"
      data-sanity={createDataAttribute({
        ...sanityConfig,
        id: documentId,
        type: documentType,
        path: 'pageBuilder',
      }).toString()}
    >
      {sections.map((section) => (
        <section
          key={section._key || randomKey()}
          data-sanity={createDataAttribute({
            ...sanityConfig,
            id: documentId,
            type: documentType,
            path: `pageBuilder[_key=="${section._key}"]`,
          }).toString()}
        >
          {renderSection(section)}
        </section>
      ))}
    </main>
  )
}

function renderSection(section: any) {
  const Component = sectionComponents[section._type]
  if (!Component) {
    console.warn(`Unknown section type: ${section._type}`)
    return null
  }
  return <Component data={section} />
}
