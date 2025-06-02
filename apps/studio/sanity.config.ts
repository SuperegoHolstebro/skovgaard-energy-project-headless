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
import Appconfig from './superego.config'
const url = process.env.SANITY_STUDIO_FRONT_END

const presentationOriginUrl_REDDAP = 'https://www.reddap.dk'
const presentationOriginUrl_IDOMLUND = process.env.SANITY_STUDIO_PRESENTATION_URL_IDOMLUND
const presentationOriginUrl_RAMME = process.env.SANITY_STUDIO_PRESENTATION_URL_RAMME
const presentationOriginUrl_NORDVESTJYLLAND = 'https://nordvestjylland-headless.vercel.app/'
export default defineConfig([
  {
    basePath: '/reddap',
    name: Appconfig.sites.reddap.siteName,
    title: Appconfig.sites.reddap.siteTitle,
    subtitle: Appconfig.sites.reddap.subTitle,
    projectId: 'wqb4hzip',
    dataset: 'production',
    ...defaultConfig({
      website: Appconfig.sites.reddap,
      presentationOriginUrl: presentationOriginUrl_REDDAP,
      apiRoute: '/api/draft-mode/enable',
    }),
  },
  /*   {
    basePath: '/nordvestjylland',
    name: Appconfig.sites.nordvestjylland.siteName,
    title: Appconfig.sites.nordvestjylland.siteTitle,
    subtitle: Appconfig.sites.nordvestjylland.subTitle,
    projectId: 'sdye5zc0',
    dataset: 'production',
    ...defaultConfig({
      website: Appconfig.sites.nordvestjylland,
      presentationOriginUrl: presentationOriginUrl_NORDVESTJYLLAND,
      apiRoute: '/api/draft-mode-nordvestjylland/enable',
    }),
  },
  {
    basePath: '/ramme',
    name: Appconfig.sites.ramme.siteName,
    title: Appconfig.sites.ramme.siteTitle,
    subtitle: Appconfig.sites.ramme.subTitle,
    projectId: 'lks8fijv',
    dataset: 'production',
    ...defaultConfig({
      website: Appconfig.sites.ramme,
      presentationOriginUrl: presentationOriginUrl_RAMME,
      apiRoute: '/api/draft-mode-ramme/enable',
    }),
  },
  {
    basePath: '/idomlund',
    name: Appconfig.sites.idomlund.siteName,
    title: Appconfig.sites.idomlund.siteTitle,
    subtitle: Appconfig.sites.idomlund.subTitle,
    projectId: '6dcmsap4',
    dataset: 'production',
    ...defaultConfig({
      website: Appconfig.sites.idomlund,
      presentationOriginUrl: presentationOriginUrl_IDOMLUND,
      apiRoute: '/api/draft-mode-idomlund/enable',
    }),
  }, */
])

function defaultConfig({ website, presentationOriginUrl, apiRoute }) {
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
            enable: apiRoute,
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
        schemaTypes: [
          'page',
          'navigation',
          'footer',
          'settings',
          'article',
          'event',
          'BreakingNews',
          'process',
        ],
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
