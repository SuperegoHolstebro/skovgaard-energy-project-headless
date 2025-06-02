import { Click } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { paddingIndicator } from '../../utils/paddingindicator'

export const CallToAction = defineType({
  name: 'CallToAction',
  type: 'object',
  title: 'Call to action',
  icon: Click,
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
    defineField({
      name: 'body',
      group: 'content',
      title: 'Brødtekst',
      type: 'blockContent',
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      description: 'Link til en side eller ekstern URL.',
      group: 'content',
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
    }),
    defineField({
      name: 'overflow',
      type: 'boolean',
      title: 'Overflow?',
      description: 'Fjern padding på bunden først.',
      group: 'design',
      initialValue: false,
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
      body: 'body',
      media: 'image',
      design: 'design',
    },
    prepare({ media, title, body, design }) {
      return {
        title: title || 'Call to action',
        subtitle: body
          ? `${paddingIndicator(design)} | ` + 'Call to action | ' + body[0]?.children[0]?.text
          : 'Ingen brødtekst',
        media: media || undefined,
      }
    },
  },
})
