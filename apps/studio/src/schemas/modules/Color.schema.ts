import { defineField, defineType } from 'sanity'

export const Color = defineType({
  type: 'object',
  name: 'color',
  title: 'Farve',
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      title: 'Farve',
      options: {
        layout: 'radio',
        list: [
          { title: 'Standard', value: 'default' },
          { title: 'Støvet Grøn', value: 'secondary' },
          { title: 'Tertiære', value: 'tertiary' },
          { title: 'Hvid', value: 'quaternary' },
        ],
      },
      initialValue: 'default',
    }),
  ],
})
