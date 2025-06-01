import { defineArrayMember, defineField, defineType } from 'sanity'
import { File } from '@mynaui/icons-react'
import Appconfig from '@repo/utils/src/superego.config'

export default defineType({
  name: 'article',
  title: 'Nyhed',
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
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),

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
      type: 'blockContent',
      name: 'body',
      title: 'Tekst',
      group: 'content',
      description: 'Sidens Tekst indhold',
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
      locale: 'locale',
      slug: 'slug',
      date: 'date',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `/${selection.locale}/${selection.slug.current} - ${new Date(selection.date).toLocaleDateString()}`,
        description: `Udgivet: ${new Date(selection.date).toLocaleDateString()}`,
        imageUrl: selection.image?.asset?.url,
      }
    },
  },
})
