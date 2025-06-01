import { paddingIndicator } from '../../../utils/paddingindicator'
import { FileText } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const ArticlesType = defineType({
  name: 'ArticlesType',
  title: 'Artikler',
  description: 'Viser en liste af artikler',
  type: 'object',
  icon: FileText,
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Artikel indstillinger', name: 'artikelindstillinger' },
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
      description: 'Teksten der vises på knappen',
      group: 'content',
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      group: 'artikelindstillinger',
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
      group: 'artikelindstillinger',
      name: 'articles',
      title: 'Artikler',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    },
    defineField({
      group: 'artikelindstillinger',
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
      view: 'view',
      design: 'design',
    },
    prepare({ title, view, design }) {
      return {
        title: title,
        subtitle: `Artikler - ${view === 'manual' ? 'Manuel' : view === 'newest' ? 'Nyeste' : 'Alle'} visning | ${paddingIndicator(design)}`,
      }
    },
  },
})
