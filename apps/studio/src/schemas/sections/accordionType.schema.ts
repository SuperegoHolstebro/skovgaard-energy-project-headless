import { PanelTopOpen } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { paddingIndicator } from '../../utils/paddingindicator'

export const accordionType = defineType({
  name: 'accordion',
  type: 'object',
  title: 'Accordions',
  icon: PanelTopOpen,
  description:
    'Udfoldelige faner, som kan indeholde en overskrift og uddybende tekst. En accordion hjælper med at spare plads og gør hjemmesiden mere overskuelig og lettere at navigere i.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    {
      name: 'accordions',
      title: 'Accordions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Accordion',
          icon: PanelTopOpen,
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Brødtekst',
              type: 'blockContent',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),

            defineField({
              name: 'unfloded',
              description:
                'Hvis denne er sat til "Ja", vil accordionen være udfoldet som standard.',
              title: 'Udfoldet',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              unfloded: 'unfloded',
            },
            prepare({ title, unfloded }) {
              return {
                title: title,
                subtitle: `Foldet ud: ${unfloded ? 'Ja' : 'Nej'}`,
              }
            },
          },
        }),
      ],
    },
    {
      type: 'design',
      name: 'design',
      title: 'Design',
    },
  ],
  preview: {
    select: {
      title: 'Accordion',
      subtitle: 'Accordions',
      accordions: 'accordions',
      design: 'design',
    },
    prepare({ title, accordions, design }) {
      return {
        title: 'Accordion',
        subtitle: `Der er ${accordions.length} accordions i denne sektion. | ${paddingIndicator(design)}`,
      }
    },
  },
})
