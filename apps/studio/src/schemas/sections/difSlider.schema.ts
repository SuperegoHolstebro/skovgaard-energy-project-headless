// ./schemas/heroType.ts

import { Exclude } from '@mynaui/icons-react'
import {defineType} from 'sanity'

export const difSlider = defineType({
  name: 'difSlider',
  type: 'object',
  icon: Exclude,
  description: 'Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.',
  title: 'Visualisering',
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    { title: "Medie", name: "media" },
    { title: 'Indstillinger', name: 'settings' }
  ],
  fields: [
    {
      name: "heading",
      type: "heading",
      group: "content",
    },
    {
      name: 'link',
      type: 'link',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },

    {
      name: 'slides',
      type: 'array',
      group: 'content',
      of: [
        {
        name: 'slide',
        type: 'object',
        fields: [
          {
            name: 'year',
            type: 'string',
            title: 'Årstal',
          },
          {
            name: 'subtitle',
            type: 'string',
            title: 'Undertitel',
          },
          {
            name: 'image',
            type: 'image',
            title: 'Billede',
          },
        ],
        },
      ],
      validation: Rule => Rule.max(2),
    },
    
    {
        name: "design",
        type: "design",
        group: "design",
      },
      {
        name: 'SectionSettings',
        type: 'SectionSettings',
        group: 'settings',
      },
  ],
  preview: {
    select: {
      title: 'heading.heading.heading',
      subtitle: '',
    },
    prepare({ title}) {
      return {
        title: title,
        subtitle: "en slider, der viser forskellige billeder og tekst.",
      }
  }
}
})