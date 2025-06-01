import { StructureResolver } from 'sanity/structure'
import events from './event.structure'
import articles from './article.structure'
import employees from './employee.structure'
import settings from './settings.structure'
import forms from './form.structure'
import footer from './settings/footer.structure'
import navigation from './settings/navigation.structure'
import pageStructure from './page.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pageStructure(S, context),
      events(S, context),
      articles(S, context),
      employees(S, context),
      S.divider().title('Globale elementer'),
      forms(S, context),
      navigation(S, context),
      footer(S, context),
      S.divider(),
      settings(S, context),
    ])
