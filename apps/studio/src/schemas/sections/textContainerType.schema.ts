import { FileText } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const textContainerType = defineType({
  name: 'textContainer',
  type: 'object',
  icon: FileText,
  title: 'Indholdsblok',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      title: 'Indhold',
      group: 'content',
    }),
    {
      name: 'design',
      type: 'design',
      group: 'design',
    },

    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      heading: 'innerBlocks.0.heading.heading',
      title: 'title',
    },
    prepare({ heading, title }) {
      return {
        title: heading || title,
        subtitle: 'Indholdsblok',
      }
    },
  },
})
