// ./schemas/textWithIllustration.js

import { Album } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const GalleryType = defineType({
  name: 'GalleryType',
  type: 'object',
  icon: Album,
  title: 'Galleri',
  description: 'Galleri med billeder.',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Medie', name: 'media' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'select',
      type: 'string',
      title: 'Vælg type',
      description: 'Vælg mellem 2 elementer eller et galleri med flere billeder.',
      options: {
        list: [
          { title: '2 Elementer', value: 'media' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'media',
    }),
    defineField({
      name: 'medie',
      type: 'array',
      title: 'Elementer',
      description:
        'Vælg mellem 2 elementer (hvis kun 1 element er valgt ville den fylde hele skærmen) eller et galleri med flere billeder. Du kan tilføje videoer og billeder.',
      hidden: ({ parent }) => parent?.select !== 'media',
      validation: (Rule) => Rule.min(1).max(2),
      of: [
        defineArrayMember({
          name: 'videoObject',
          type: 'object',
          title: 'Video',
          fields: [
            defineField({
              name: 'video',
              type: 'file',
              title: 'Video',
              options: {
                accept: 'video/mp4',
              },
            }),
            defineField({
              name: 'poster',
              type: 'image',
              title: 'Poster',
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Titel',
            }),
          ],
        }),
        defineArrayMember({
          type: 'image',
          title: 'Billede',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
              description:
                'Beskriv billedet, så det kan forstås af skærmlæsere og i tilfælde af at billedet ikke kan vises.',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Billeder',
      hidden: ({ parent }) => parent?.select !== 'carousel',
      of: [
        defineArrayMember({
          name: 'videoObject',
          type: 'object',
          title: 'Video',
          fields: [
            defineField({
              name: 'video',
              type: 'file',
              title: 'Video',
              options: {
                accept: 'video/mp4',
              },
            }),
            defineField({
              name: 'poster',
              type: 'image',
              title: 'Poster',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
            }),
          ],
        }),
        defineArrayMember({
          type: 'image',
          title: 'Billede',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
              description:
                'Beskriv billedet, så det kan forstås af skærmlæsere og i tilfælde af at billedet ikke kan vises.',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
    }),
    defineField({
      name: 'SectionSettings',
      title: 'Sektion indstillinger',
      type: 'SectionSettings',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      select: 'select',
      medie: 'medie',
      images: 'images',
    },
    prepare(selection) {
      const { select, medie, images } = selection
      const isMedie = select === 'media' && medie?.length > 0
      const isCarousel = select === 'carousel' && images?.length > 0
      return {
        title: `${select === 'media' ? '2 Elementer' : 'Galleri'}`,
        subtitle: `Galleri | Viser ${
          isMedie ? medie.length : isCarousel ? images.length : 0
        } element(er)`,
      }
    },
  },
})
