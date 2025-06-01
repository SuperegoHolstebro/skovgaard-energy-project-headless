import { FileText } from '@mynaui/icons-react'
import { defineArrayMember, defineType } from 'sanity'

export const innerBlocks = defineType({
  name: 'innerBlocks',
  type: 'array',
  title: 'Indhold',
  icon: FileText,
  options: {
    sortable: true,
  },
  of: [
    defineArrayMember({
      name: 'heading',
      type: 'heading',
    }),
    defineArrayMember({
      name: 'textBlock',
      type: 'textBlock',
    }),
    defineArrayMember({
      name: 'button',
      type: 'button',
    }),
    defineArrayMember({
      name: 'accordion',
      type: 'accordion',
    }),
  ],
})
