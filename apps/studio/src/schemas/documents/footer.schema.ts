import { Envelope, Telephone, UserWaves } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Indstillinger',
  type: 'document',
  groups: [
    { title: 'Kontakt oplysninger', name: 'contact', icon: Telephone, default: true },
    { title: 'Sociale medier', name: 'social', icon: UserWaves },
  ],
  description: 'Footer indstillinger',

  fields: [
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'object',
      group: 'contact',
      type: 'object',
      description: 'Kontakt oplysninger',
      title: 'Kontakt oplysninger',
      fields: [
        defineField({
          name: 'companyName',
          title: 'Virksomhedsnavn',
          type: 'string',
        }),
        defineField({
          name: 'adressBook',
          type: 'object',
          options: {
            columns: 2,
          },
          fields: [
            defineField({
              name: 'street',
              type: 'string',
              title: 'Gade + nr',
            }),
            defineField({
              name: 'zip',
              type: 'string',
              title: 'Postnummer + by',
            }),
          ],
        }),
        defineField({
          name: 'telephone',
          type: 'string',
          title: 'Telefon',
          description: 'Telefonnummer',
        }),
        defineField({
          name: 'email',
          type: 'email',
          title: 'Email',
          description: 'Email address',
        }),
        defineField({
          name: 'cvr',
          type: 'string',
          title: 'CVR',
          description: 'CVR nummer for virksomheden eks. 12345678',
        }),
      ],
    }),
    defineField({
      name: 'social',
      group: 'social',
      title: 'Sociale medier',
      description: 'Tilføj links til sociale medier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: '',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Github', value: 'github' },
                  { title: 'Google', value: 'google' },
                  { title: 'Youtube', value: 'youtube' },
                  { title: 'Apple', value: 'apple' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Figma', value: 'figma' },
                  { title: 'Dribble', value: 'dribble' },
                  { title: 'Reddit', value: 'reddit' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Tiktok', value: 'tiktok' },
                  { title: 'Clubhouse', value: 'clubhouse' },
                  { title: 'Slack', value: 'slack' },
                ],
              },
            }),
            defineField({
              name: 'url',
              hidden: ({ parent }) => !parent?.platform,
              type: 'url',
              title: 'URL',
              description: 'URL for the selected social media platform',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Åbningstider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  { title: 'Mandag', value: 'mandag' },
                  { title: 'Tirsdag', value: 'tirsdag' },
                  { title: 'Onsdag', value: 'onsdag' },
                  { title: 'Torsdag', value: 'torsdag' },
                  { title: 'Fredag', value: 'fredag' },
                  { title: 'Lørdag', value: 'lørdag' },
                  { title: 'Søndag', value: 'søndag' },
                ],
              },
            }),
            defineField({
              name: 'hours',
              title: 'Åbningstider',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'day',
              subtitle: 'hours',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      locale: 'locale',
    },
    prepare(locale) {
      return {
        title: `Footer — ${locale.locale}`,
      }
    },
  },
})
