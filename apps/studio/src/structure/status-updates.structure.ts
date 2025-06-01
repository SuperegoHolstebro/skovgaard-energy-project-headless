import { ChartLine, Rss } from '@mynaui/icons-react'
import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(Rss)
    .title('Status opdateringer')
    .child((documentId) =>
      S.document()
        .documentId(documentId)
        .schemaType('BreakingNews')
        .views([S.view.form().id('breakingNewsEditor')]),
    ),
)
