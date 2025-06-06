/* import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import { FileText, Tag } from '@mynaui/icons-react'
 */
/* export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Nyheder')
    .icon(FileText)
    .id('artikler')
    .child(
      S.documentTypeList('article')
        .title('Artikler')
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('article')
            .views([S.view.form().id('articleEditor')]),
        ),
    ),
)
 */

import { ListItemBuilder } from 'sanity/structure'
import Appconfig from '@repo/utils/superego.config'
import { Folder } from '@mynaui/icons-react'
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
      .title('Nyheder')
      .icon(Folder)
      .child(
        S.documentTypeList('article')
          .title('Alle nyheder')
          .filter('_type == "article" && locale == $locale')
          .params({ locale: locales[0].id }),
      )
  }

  // Multiple locales – show language-specific lists and "missing language"
  return S.listItem()
    .title('Nyheder')
    .icon(Folder)
    .child(
      S.list()
        .title('Sprog')
        .items([
          ...locales.map((locale) =>
            S.listItem()
              .title(locale.title)
              .icon(iconByLocale(locale.id))
              .child(
                S.documentTypeList('article')
                  .title(locale.title)
                  .filter('_type == "article" && locale == $locale')
                  .params({ locale: locale.id }),
              ),
          ),
          S.listItem()
            .title('Mangler sprog')
            .icon(iconByLocale('missing'))
            .child(
              S.documentTypeList('article')
                .title('Mangler sprog')
                .filter('_type == "article" && !defined(locale)'),
            ),
        ]),
    )
})
