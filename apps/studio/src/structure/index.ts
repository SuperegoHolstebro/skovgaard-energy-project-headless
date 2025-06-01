import { StructureResolver } from 'sanity/structure'
import articles from './article.structure'
import employees from './employee.structure'
import settings from './settings.structure'
import footer from './settings/footer.structure'
import navigation from './settings/navigation.structure'
import pageStructure from './page.structure'
import process from './process.structure'
import statusUpdates from './status-updates.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pageStructure(S, context),
      articles(S, context),
      employees(S, context),
      S.divider().title('Opdateringer'),
      statusUpdates(S, context),
      process(S, context),
      S.divider().title('Globale elementer'),
      // forms(S, context),
      navigation(S, context),
      footer(S, context),
      S.divider(),
      settings(S, context),
    ])
