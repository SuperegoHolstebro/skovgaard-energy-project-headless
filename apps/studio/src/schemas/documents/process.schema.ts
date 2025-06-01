import { ChartLine } from '@mynaui/icons-react'
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
      description: 'Titlen på begivenheden',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Udvalgt billede',
      description:
        'Billedet der vises i "begivenheder" oversigten og på selve begivenheden',
    }),
    defineField({
      name: 'status',
      type: 'boolean',
      title: 'Status',
      group: 'content',
      description: 'Er processen færdig eller ej',
      // initialValue: false,
      options: {
        layout: 'switch',
      },
      initialValue: false,
    }),
    /* defineField({
      name: "date",
      title: "Dato",
      description: "Årstal og måned for begivenheden",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM",
        timeFormat: "",
        timeStep: 1440, // Set timeStep to 1 to remove hours and minutes
      },
      group: "content",
    }), */
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      group: 'content',
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
