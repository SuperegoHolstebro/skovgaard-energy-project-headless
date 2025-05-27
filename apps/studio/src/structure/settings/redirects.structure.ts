import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { CornerUpRight } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(CornerUpRight)
    .title('Redirects')
    .child(S.document().schemaType('redirect').views([S.view.form()])),
)
