// ./schemas/DataType.ts

import { defineField, defineType } from 'sanity'
import { QuestionCircle } from '@mynaui/icons-react'
import Icon from '../../components/Icons'
import IconPickerInput from '../../components/IconPickerInput'
import { paddingIndicator } from '../../utils/paddingindicator'

export const DataType = defineType({
  name: 'DataType',
  type: 'object',
  icon: QuestionCircle,
  description: 'Fakta sektion, der præsenterer information i kasser.',
  title: 'Fakta',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      type: 'heading',
      name: 'heading',
      title: 'Overskrift',
      group: 'content',
    }),
    {
      group: 'content',
      name: 'dataBox',
      title: 'Informations kasser',
      type: 'array',
      of: [
        {
          name: 'dataObject',
          title: 'Data kasse',
          type: 'object',
          preview: {
            select: {
              title: 'heading',
              subtitle: 'body',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              // Extract first line of blockContent for subtitle preview
              let firstLine = ''
              if (Array.isArray(subtitle) && subtitle.length > 0) {
                const firstBlock = subtitle.find((block: any) => block._type === 'block')
                if (firstBlock && Array.isArray(firstBlock.children) && firstBlock.children.length > 0) {
                  firstLine = firstBlock.children.map((child: any) => child.text).join(' ')
                }
              }
              return {
                title: title || 'Ingen overskrift',
                subtitle: firstLine || '',
                media: icon ? <Icon type={icon as any} /> : null,
              }
            },
          },
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Overskrift',
            }),
            /*             defineField({
                          name: 'text',
                          type: 'text',
                          title: 'Tekst',
                        }), */
            defineField({
              name: 'body',
              type: 'blockContent',
              title: 'Tekst',
            }),
            {
              name: 'icon',
              type: 'string',
              title: 'Ikon',
              components: {
                input: IconPickerInput,
              },
              options: {
                list: [
                  { title: 'Igen ikon', value: 'empty' },
                  { title: 'Lokation', value: 'Lokation' },
                  { title: 'Strategi', value: 'Strategi' },
                  { title: 'Miljø', value: 'Miljø' },
                  { title: 'Kalender', value: 'Kalender' },
                  { title: 'Kurve', value: 'Kurve' },
                  { title: 'Rakat', value: 'Rakat' },
                  { title: 'Solenergi', value: 'Solenergi' },
                  { title: 'Vindenergi', value: 'Vindenergi' },
                  { title: 'Insekter', value: 'Insekter' },
                  { title: 'Genbrug', value: 'Genbrug' },
                  { title: 'Mad', value: 'Mad' },
                  { title: 'Planlægning', value: 'Planlægning' },
                  { title: 'Tid', value: 'Tid' },
                  { title: 'Præsentation', value: 'Præsentation' },
                  { title: 'Jorden', value: 'Jorden' },
                  { title: 'Tjek', value: 'Tjek' },
                  { title: 'Business', value: 'Business' },
                  { title: 'Lyd', value: 'Lyd' },
                  { title: 'Strøm', value: 'Strøm' },
                  { title: 'Ingeniør', value: 'Ingeniør' },
                  { title: 'Vej', value: 'Vej' },
                  { title: 'Borger', value: 'Borger' },
                  { title: 'Trafik', value: 'Trafik' },
                  { title: 'Service', value: 'Service' },
                  { title: 'Info', value: 'Info' },
                  { title: 'Vand', value: 'Vand' },
                  { title: 'Download', value: 'Download' },
                  { title: 'Fil', value: 'Fil' },
                  { title: 'Link', value: 'Link' },
                  { title: 'Eksternt', value: 'Eksternt' },
                ],
              },
            },
            defineField({
              name: 'link',
              type: 'link',
              title: 'Knap',
            }),
          ],
        },
      ],
    },
    defineField({
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
      name: 'link',
      title: 'Knap',
      type: 'button',
    }),
    {
      name: 'design',
      type: 'design',
      group: 'design',
    },
    {
      name: 'SectionSettings',
      type: 'SectionSettings',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      heading: 'heading',
      subtitle: 'datBox',
      dataBox: 'dataBox',
      design: 'design',
    },
    prepare({ heading, dataBox, design }) {
      return {
        title: heading.text,
        subtitle: `Der er ${dataBox.length} kasser i denne sektion. | ${paddingIndicator(design)}`,

      }
    },
  },
})
