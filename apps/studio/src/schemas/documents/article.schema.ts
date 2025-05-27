import { defineArrayMember, defineField, defineType } from 'sanity'
import { File } from '@mynaui/icons-react'

export default defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'settings', title: 'SideIndstillinger' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        // slugify: input => `begivenheder/${input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)}`,
      },
    }),
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
    }),
    {
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      description: 'Vælg en kategori',
      to: [{ type: 'category' }],
      group: 'settings',
    },
    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      type: 'image',
      group: 'settings',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Udgivelsesdato',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      group: 'content',
      description: 'Sidens Tekst indhold',
      type: 'array',
      of: [defineArrayMember({ type: 'block', title: 'blockContent' })],
    }),
    defineField({
      group: 'seo',
      name: 'seoGroup',
      title: 'SEO',
      description: 'SEO indstillinger',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.title',
      date: 'date',
      image: 'mainImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Af: ${selection.author}`,
        description: `Udgivet: ${new Date(selection.date).toLocaleDateString()}`,
        media: selection.image,
      }
    },
  },
})
