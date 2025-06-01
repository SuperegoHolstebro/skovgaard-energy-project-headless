import React from 'react'
import Heading from '../atoms/Heading'
import { Button } from '../atoms/Button'
import Paragraph from '../atoms/Paragraph'
import Accordion from '../molecules/Accordion'
import { clean } from '@repo/utils/src/sanitize'
import { extractPlainText } from '@repo/utils/src/StructuredJsonData'


interface InnerBlocks_Type {
  blocks: any
  index?: number
}

const InnerBlocks = ({ blocks, index }: InnerBlocks_Type) => {
  return (
    <React.Fragment key={index}>
      {blocks?.map((block: any, index: any) => {
        switch (block._type) {
          case 'heading':
            return <InnerBlocks.Title key={index} data={block} />
          case 'textBlock':
            return <InnerBlocks.Paragraphs key={index} data={block} />
          case 'button':
            return (
              <div key={index} className="mt-8">
                <Button link={block.link} variant={clean(block.style) as any}>
                  {block.link.label}
                </Button>
              </div>
            )
          case 'accordion':
            return <InnerBlocks.AccordionGroup key={index} data={block} />
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default InnerBlocks

InnerBlocks.Title = Title
InnerBlocks.AccordionGroup = AccordionGroup
InnerBlocks.Paragraphs = Paragraphs

/* compound components */
function Title({ data }: { data: any }) {
  return (
    <Heading hyphens={'manual'} spacing="default" data={data} dangerouslySetInnerHTML={{ __html: data?.heading?.heading }} />
  )
}

function AccordionGroup({ data }: { data: any }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data?.accordions?.map((accordion: any) => ({
      '@type': 'Question',
      name: accordion?.title || null,
      acceptedAnswer: {
        '@type': 'Answer',
        text: extractPlainText(accordion?.body) || null,
      },
    })),
  }

  return (
    <div className="w-full mt-8 mb-8 space-y-4">
      {data.accordions.map((accordion: any, index: number) => (
        <Accordion
          key={index}
          title={accordion?.title}
          unfloded={clean(accordion?.unfloded as any) || false}
        >
          <Paragraph isPortableText size="regular">
            {accordion?.body as any}
          </Paragraph>
        </Accordion>
      ))}
      {data.turnIntoStructuredData == true && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </div>
  )
}

function Paragraphs({ data }: { data: any }) {
  return <Paragraph isPortableText>{data.body as any}</Paragraph>
}
