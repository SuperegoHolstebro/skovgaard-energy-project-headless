import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import { PanelBottom } from '@mynaui/icons-react'
import Appconfig from '@repo/utils/src/superego.config'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .icon(PanelBottom)
    .title('Footer')
    .child(S.document().schemaType('footer').views([S.view.form()])),
)
