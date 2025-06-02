// ./schemas/textWithIllustration.js

import { defineArrayMember, defineField, defineType } from 'sanity'
import { paddingIndicator } from '../../utils/paddingindicator'

export const NewsLetterCTA = defineType({
  name: 'NewsLetterCTA',
  type: 'object',
  title: 'Nyhedbrev CTA',
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
      group: 'content',
    }),
    {
      name: 'body',
      title: 'Body',
      group: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Block',
        }),
      ],
    },
    defineField({
      name: 'link',
      type: 'link',
      group: 'content',
    }),
    {
      name: 'design',
      type: 'design',
      group: 'design',
    },
    {
      name: 'overflow',
      type: 'boolean',
      title: 'Overflow?',
      description: 'Fjern padding på bunden først.',
      group: 'design',
    },
    {
      name: 'SectionSettings',
      type: 'SectionSettings',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      tagline: 'tagline',
      media: 'image',
      design: 'design',
    },
    prepare({ media, title, design }) {
      return {
        title: title,
        subtitle: 'Nyhedbrev CTA' + ' | ' + paddingIndicator(design),
        media,
      }
    },
  },
})
