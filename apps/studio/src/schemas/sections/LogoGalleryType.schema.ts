import { Album } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const LogoGallery = defineType({
  name: 'LogoGallery',
  type: 'object',
  title: 'Logo Galleri',
  icon: Album,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
      title: 'title',
    },
    prepare(selection) {
      const { images, image, title } = selection

      return {
        subtitle: `Logo galleri`,
        title: title ? `${title}` : `Logo galleri med ${Object.keys(images).length} billeder`,
        media: image,
      }
    },
  },
})
