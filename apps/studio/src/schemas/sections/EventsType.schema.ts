import { paddingIndicator } from '../../utils/paddingindicator'
import { CalendarCheck } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
export const EventType = defineType({
  name: 'EventType',
  title: 'Begivenheder',
  description: 'Viser en liste af begivenheder',
  type: 'object',
  icon: CalendarCheck,
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'view',
      title: 'Visning',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Nyeste', value: 'newest' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    {
      group: 'content',
      name: 'events',
      title: 'Begivenheder',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    },
    defineField({
      group: 'content',
      name: 'amount',
      type: 'number',
      hidden: ({ parent }) => parent?.view !== 'newest',
      title: 'Antal begivenheder',
      initialValue: 4,
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
      title: 'heading',
      design: 'design',
    },
    prepare({ title, design }) {
      return {
        title: title,
        subtitle: 'Begivenheder' + ' | ' + paddingIndicator(design),
      }
    },
  },
})
