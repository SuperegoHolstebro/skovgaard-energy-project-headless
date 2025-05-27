import { Briefcase, Image, InfoCircle, Telephone, UserSquare } from '@mynaui/icons-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'employee',
  title: 'Medarbejder',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  liveEdit: false,
  icon: UserSquare,
  groups: [
    { title: 'Personlige oplysninger', name: 'personalInformation', icon: InfoCircle },
    { title: 'Stilling detaljer', name: 'positionDetails', icon: Briefcase },
    { title: 'Kontaktoplysninger', name: 'contactInformation', icon: Telephone },
    { title: 'Medier', name: 'media', icon: Image },
  ],
  fields: [
    {
      name: 'title',
      title: 'Navn',
      description: 'Navnet på medarbejder',
      type: 'string',
      group: 'personalInformation',
    },
    {
      name: 'email',
      title: 'Email',
      description: 'Email til medarbejderen',
      type: 'string',
      group: 'contactInformation',
    },
    {
      name: 'phone',
      title: 'Telefonnummer',
      description: 'Telefonnummer til medarbejderen',
      type: 'string',
      group: 'contactInformation',
    },
    {
      name: 'image',
      options: {
        hotspot: true,
      },
      title: 'Billede',
      description: 'Billede af medarbejderen',
      type: 'image',
      group: 'media',
    },
    {
      name: 'employeePosition',
      title: 'Medarbejder Stilling',
      description: 'Stillingen på medarbejderen',
      options: {
        collapsible: true,
      },
      type: 'object',
      group: 'positionDetails',
      fields: [
        {
          name: 'simplePosition',
          type: 'boolean',
          title: 'Simple Position',
          description: 'Check this if the employee has a simple position',
          options: {
            layout: 'checkbox',
          },
          initialValue: true,
        },
        {
          name: 'position',
          title: 'Position',
          type: 'string',
          //hide if simplePosition is true
          hidden: ({ parent }: { parent: { simplePosition: boolean } }) =>
            parent?.simplePosition === false,
        },
        {
          name: 'stilling',
          title: 'Stilling',
          type: 'array',
          of: [
            {
              name: 'positionTags',
              title: 'Medarbejder Stilling',
              type: 'reference',
              to: [{ type: 'position' }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      position: 'employeePosition.position',
    },
    prepare(selection: { title: any; media: any; position: any }) {
      const { title, media, position } = selection
      return {
        title: title,
        media: media,
        subtitle: position,
      }
    },
  },
})
