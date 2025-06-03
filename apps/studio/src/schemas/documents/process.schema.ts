import { ChartLine } from '@mynaui/icons-react'
import Appconfig from '@repo/utils/superego.config'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'process',
  title: 'Procesplan',
  icon: ChartLine,
  type: 'document',
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Titlen på processen, der vises i oversigten',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Udvalgt billede',
      description: 'Billedet der vises i "begivenheder" oversigten og på selve begivenheden',
    }),
    defineField({
      name: 'status',
      type: 'boolean',
      title: 'Status',
      group: 'content',
      description: 'Er processen færdig eller ej',
      options: {
        layout: 'switch',
      },
      initialValue: false,
    }),

    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      group: 'content',
      title: 'Indhold',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      image: 'image',
    },
    prepare: ({ title, status, image }) => ({
      title: title,
      subtitle: status ? 'Projektet er færdigt' : 'Projektet er igang',
      media: image,
    }),
  },
})
