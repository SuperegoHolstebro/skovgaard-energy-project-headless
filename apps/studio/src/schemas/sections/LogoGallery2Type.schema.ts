import { paddingIndicator } from '../../utils/paddingindicator'
import { Album } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const LogoGallery2 = defineType({
  name: 'LogoGallery2',
  type: 'object',
  title: 'Logo Galleri 2',
  icon: Album,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    },

    {
      name: 'images',
      type: 'array',
      title: 'Billeder',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Billede',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    defineField({
      name: 'design',
      title: 'Design',
      type: 'design',
    }),
    defineField({
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
      design: 'design',
    },
    prepare(selection) {
      const { images, image, design } = selection

      return {
        title: `Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Galleri | ${paddingIndicator(design)}`,
        media: image,
      }
    },
  },
})
