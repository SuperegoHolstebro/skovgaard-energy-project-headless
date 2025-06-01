import Appconfig from '@repo/utils/src/superego.config'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'BreakingNews',
  title: 'Statusopdatering',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: Appconfig.i18n.defaultLocaleId,
    }),
    defineField({
      type: 'boolean',
      name: 'active',
      title: 'Aktiv',
      description: 'Aktiverer statusopdateringen på hele siden',
      initialValue: false,
    }),
    {
      type: 'array',
      name: 'news',
      title: 'Nyheder',
      description: 'Nyheder vises i rækkefølge, hvor den nyeste er øverst',
      of: [{ type: 'string' }],
    },
    {
      title: 'Title',
      type: 'string',
      name: 'title',
      initialValue: 'Statusopdatering',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'aktiv',
    },
    prepare() {
      return {
        title: `Statusopdatering`,
      }
    },
  },
})
