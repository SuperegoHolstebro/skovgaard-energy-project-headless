import { Briefcase } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'position',
  title: 'Stilling',
  icon: Briefcase,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'titel på stillingen',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: { title: any }) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
})
