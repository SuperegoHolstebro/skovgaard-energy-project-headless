import { paddingIndicator } from '../../../utils/paddingindicator'
import { Album } from '@mynaui/icons-react'
import { defineType } from 'sanity'

export const LogoGallery = defineType({
  name: 'LogoGallery',
  type: 'object',
  title: 'Logo Galleri',
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
    {
      name: 'design',
      title: 'Design',
      type: 'design',
    },
    {
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
      title: 'title',
      design: 'design',
    },
    prepare(selection) {
      const { images, image, design } = selection

      return {
        title: `Logo Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Logo Galleri | ${paddingIndicator(design)}`,
        media: image,
      }
    },
  },
})
