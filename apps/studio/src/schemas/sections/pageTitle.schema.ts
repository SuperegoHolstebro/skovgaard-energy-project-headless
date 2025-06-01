// ./schemas/textWithIllustration.js

import { PanelTop } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pageTitle = defineType({
  name: 'pageTitle',
  type: 'object',
  title: 'Side titel',
  icon: PanelTop,
  description: 'En titel til en side',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Medie', name: 'media' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Overskrift',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
    }),
    defineField({
      group: 'content',
      name: 'buttons',
      title: 'Knapper ',
      type: 'array',
      description:
        "Tilføj knapper til siden. Du kan tilføje links til sider eller eksterne URL'er.",
      of: [
        defineArrayMember({
          name: 'button',
          type: 'button',
        }),
      ],
    }),

    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
    }),
    defineField({
      name: 'SectionSettings',
      type: 'SectionSettings',
      title: 'Sektion indstillinger',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tagline: 'tagline',
      media: 'image',
    },
    prepare({ title, tagline }) {
      return {
        title: title,
        subtitle: 'Side titel',
      }
    },
  },
})
