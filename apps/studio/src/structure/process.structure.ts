import { ChartLine } from '@mynaui/icons-react'
import { ListItemBuilder } from 'sanity/structure'
import Appconfig from '@repo/utils/src/superego.config'
import { iconByLocale } from '../utils/iconByLocale'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S, context) => {
  // Get the current site configuration based on project ID
  const currentProjectId = context.projectId
  const currentSite = Object.values(Appconfig.sites).find(
    (site) => site.projectId === currentProjectId,
  )

  // Fall back to global config if no matching site found
  const locales = currentSite?.i18n?.locales || Appconfig.i18n.locales

  // Only one locale – no language switching needed
  if (locales.length === 1) {
    return S.listItem()
      .title('Procesplan')
      .icon(ChartLine)
      .child(
        S.documentTypeList('process')
          .title('Alle Procesplaner')
          .filter('_type == "process" && locale == $locale')
          .params({ locale: locales[0].id }),
      )
  }

  // Multiple locales – show language-specific lists and "missing language"
  return S.listItem()
    .title('Procesplan')
    .icon(ChartLine)
    .child(
      S.list()
        .title('Sprog')
        .items([
          ...locales.map((locale) =>
            S.listItem()
              .title(locale.title)
              .icon(iconByLocale(locale.id))
              .child(
                S.documentTypeList('process')
                  .title(locale.title)
                  .filter('_type == "process" && locale == $locale')
                  .params({ locale: locale.id }),
              ),
          ),
          S.listItem()
            .title('Mangler sprog')
            .icon(iconByLocale('missing'))
            .child(
              S.documentTypeList('process')
                .title('Mangler sprog')
                .filter('_type == "process" && !defined(locale)'),
            ),
        ]),
    )
})
