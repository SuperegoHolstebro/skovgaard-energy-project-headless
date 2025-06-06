// ./schemas/textWithIllustration.js

import { defineArrayMember, defineField, defineType } from 'sanity'
import { paddingIndicator } from '../../utils/paddingindicator'

export const ProcessType = defineType({
  name: 'ProcessType',
  type: 'object',
  title: 'Procesplan ',
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
      name: 'description',
      type: 'text',
      title: 'beskrivelse',
    }),
    {
      group: 'content',
      name: 'processes',
      title: 'Informations kasser',
      type: 'array',
      of: [
        {
          name: 'processYear',
          type: 'object',
          title: 'Proces år',
          fields: [
            defineField({
              name: 'year',
              type: 'string',
              title: 'År',
            }),
            {
              name: 'processes',
              title: 'Informations kasser',
              type: 'array',
              of: [
                {
                  name: 'reference',
                  type: 'reference',
                  to: [{ type: 'process' }],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'design',
      type: 'design',
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
      subtitle: 'description',
      type: 'type',
      media: 'image',
      design: 'design',
    },
    prepare({ title, subtitle, design }) {
      return {
        title: title,
        subtitle: paddingIndicator(design) + ' | ' + subtitle,
      }
    },
  },
})
