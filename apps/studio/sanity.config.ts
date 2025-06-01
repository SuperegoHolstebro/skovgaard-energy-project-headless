'use client'
import { daDKLocale } from '@sanity/locale-da-dk'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId } from './src/lib/sanity.api'
import { schema } from './src/schemas'
import { linkField } from '@repo/link-field'
import { structure } from './src/structure'
import * as resolve from './src/lib/sanity.resolve'
import { dashboardTool } from '@sanity/dashboard'
import { DocumentStatus } from './src/lib/sanity.badge'
import { CustomToolMenu } from './src/components/ToolMenu'
import { createVisualAction } from './src/actions/sanity.actions'
import { myTheme } from './src/lib/sanity.theme'
import { pages } from '@repo/sanity-studio/src/plugins/navigator/index'
import Appconfig from '@repo/utils/src/superego.config'
import {
  DeleteTranslationAction,
  documentInternationalization,
} from '@sanity/document-internationalization'

/* Dashboard package */
import '@repo/dashboard/global.css'
import HeroWidget from '@repo/dashboard/hero-widget'
import SuperegoLogo from '@repo/dashboard/superego-logo'
import LinksWidget from '@repo/dashboard/links-widget'
import ProjectManagerWidget from '@repo/dashboard/project-manager-widget'
import SuperegoWidget from '@repo/dashboard/superego-widget'
const url = process.env.SANITY_STUDIO_FRONT_END
const presentationOriginUrl = process.env.SANITY_STUDIO_PRESENTATION_URL

export default defineConfig([
  {
    basePath: Appconfig.sites.reddap.basePath,
    name: Appconfig.sites.reddap.siteName,
    title: Appconfig.sites.reddap.siteTitle,
    subtitle: Appconfig.sites.reddap.subTitle,
    projectId: Appconfig.sites.reddap.projectId,
    dataset: 'production',
    ...defaultConfig({ website: Appconfig.sites.reddap }),
  },
  {
    basePath: Appconfig.sites.ramme.basePath,
    name: Appconfig.sites.ramme.siteName,
    title: Appconfig.sites.ramme.siteTitle,
    subtitle: Appconfig.sites.ramme.subTitle,
    projectId: Appconfig.sites.ramme.projectId,
    dataset: 'production',
    ...defaultConfig({ website: Appconfig.sites.ramme }),
  },
  {
    basePath: Appconfig.sites.idomlund.basePath,
    name: Appconfig.sites.idomlund.siteName,
    title: Appconfig.sites.idomlund.siteTitle,
    subtitle: Appconfig.sites.idomlund.subTitle,
    projectId: Appconfig.sites.idomlund.projectId,
    dataset: 'production',
    ...defaultConfig({ website: Appconfig.sites.idomlund }),
  },
  {
    basePath: Appconfig.sites.nordvestjylland.basePath,
    name: Appconfig.sites.nordvestjylland.siteName,
    title: Appconfig.sites.nordvestjylland.siteTitle,
    subtitle: Appconfig.sites.nordvestjylland.subTitle,
    projectId: Appconfig.sites.nordvestjylland.projectId,
    dataset: 'production',
    ...defaultConfig({ website: Appconfig.sites.nordvestjylland }),
  },
])

function defaultConfig({ website }) {
  return {
    theme: myTheme,
    icon: SuperegoLogo,
    schema: schema,
    releases: { enabled: false },
    scheduledPublishing: { enabled: false },
    announcements: { enabled: false },
    studio: { components: { toolMenu: CustomToolMenu } },
    plugins: [
      dashboardTool({
        title: 'Startside',
        widgets: [
          {
            name: 'HeroWidget',
            component: () => HeroWidget({ NEXT_PUBLIC_BASE_URL: url }),
            layout: { width: 'full' },
          },
          {
            name: 'links',
            component: () => LinksWidget({ NEXT_PUBLIC_BASE_URL: url }),
            layout: { width: 'auto', height: 'large' },
          },
          {
            name: 'ProjectManagerWidget',
            component: () => ProjectManagerWidget({ NEXT_PUBLIC_BASE_URL: url }),
            layout: { width: 'medium', height: 'large' },
          },
          {
            name: 'SuperegoWidget',
            component: SuperegoWidget,
            layout: { width: 'medium', height: 'large' },
          },
        ],
      }),
      structureTool({ structure, title: 'Indhold' }),
      pages({
        i18n: website.i18n,
        title: 'Visuel redigering',
        resolve,
        previewUrl: {
          origin: presentationOriginUrl,
          previewMode: {
            enable: '/api/draft-mode/enable',
          },
        },
        creatablePages: [
          {
            title: 'Sider',
            type: 'page',
          },
          {
            title: 'Artikler',
            type: 'article',
          },
          {
            title: 'Event',
            type: 'event',
          },
        ],
      }),
      documentInternationalization({
        // Required configuration
        supportedLanguages: [...website.i18n.locales],
        schemaTypes: ['page', 'navigation', 'footer', 'settings', 'article', 'event'],
        languageField: 'locale',
      }),
      media({
        creditLine: {
          enabled: true,
          excludeSources: ['unsplash'],
        },
        maximumUploadSize: 10000000,
      }),
      visionTool({ defaultApiVersion: apiVersion, title: 'Udviklingsværktøj' }),
      daDKLocale({ title: 'Dansk' }),
      unsplashImageAsset(),
      linkField({
        linkableSchemaTypes: ['page', 'event', 'article'],
      }),
    ],
    document: {
      DeleteTranslationAction(prev, { schemaType }) {
        //TODO move into i18n
        // these will be the schema types you're passing to the plugin configuration
        return schemaType.includes(schemaType)
          ? prev.map((action) => (action.action === 'duplicate' ? DeleteTranslationAction : action))
          : prev
      },
      actions: (prev, context) =>
        prev.map((originalAction) =>
          originalAction.action === 'publish'
            ? (props) => {
                const action = createVisualAction(originalAction)(props)
                return {
                  ...action,
                  tone: 'positive', // Ensure tone is one of the allowed types
                  label: action?.label || 'Publish', // Ensure label is defined
                }
              }
            : originalAction,
        ),
      badges: (prev, context) => {
        if (
          context.schemaType === 'page' ||
          context.schemaType === 'article' ||
          context.schemaType === 'events'
        ) {
          return [DocumentStatus, ...prev]
        }
        return prev
      },
    },
    form: {
      // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
      file: {
        assetSources: (previousAssetSources) => {
          return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
        },
      },
    },
  }
}
