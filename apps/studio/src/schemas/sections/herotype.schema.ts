import { PanelTopInactive } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
export const heroType = defineType({
  name: 'hero',
  type: 'object',
  groups: [
    { title: 'Design', name: 'design' },
    { title: 'Indhold', name: 'content' },
    { title: 'Billeder', name: 'media' },
    { title: 'Infobokse', name: 'infoboxes' },
  ],
  description:
    'Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.',
  title: 'Header',
  icon: PanelTopInactive,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Overskrift',
      group: 'content',
    }),
    defineField({
      name: 'tagline',
      type: 'text',
      title: 'Beskrivelse',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Billede',
      group: 'media',
      type: 'image',
      description: 'Fallback billede, hvis brugeren`s enhed har langsomt internet.',
    }),

    defineField({
      name: 'images',
      title: 'Billeder',
      description: 'Billedet der vises i start animation',
      type: 'array',
      group: 'media',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Billede',
        }),
      ],
    }),

    defineField({
      name: 'infoboxes',
      title: 'Infobokse',
      group: 'infoboxes',
      description: 'Infobokse fremhæver vigtig information, som f.eks. Co2-reduktion mm, ',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'info',
          preview: {
            select: {
              title: 'heading',
              subtitle: 'text',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Ingen overskrift',
                subtitle: subtitle || 'Ingen tekst',
              }
            },
          },
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Overskrift',
              description: 'Overskrift for infoboksen',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Tekst',
              description: 'Tekst i infoboksen',
              validation: (Rule) =>
                Rule.max(55).warning('Infoboksen er tiltænkt til at være kort.'),
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      tagline: 'tagline',
      media: 'image',
    },
    prepare({ title, media, tagline }) {
      return {
        title: title || 'No title',
        subtitle: `Header | ${tagline}`,
        media,
      }
    },
  },
})
