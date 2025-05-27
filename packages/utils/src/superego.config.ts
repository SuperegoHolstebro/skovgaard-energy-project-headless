/**
 * Configuration object for the application.
 *
 * @property {string} fullWebsiteUrl - The full URL of the website.
 * @property {string} siteTitle - The title of the site.
 * @property {Object} i18n - Internationalization settings.
 * @property {Array<{ id: string; title: string }>} i18n.locales - List of supported locales with their IDs and titles.
 * @property {string} i18n.defaultLocaleId - The ID of the default locale.
 * @property {string} siteName - The name of the site without spicial characters or spaces - used for sanity.
 */

const Appconfig = {
  fullWebsiteUrl: 'https://sanity-turbo.vercel.app',
  siteTitle: 'sanity turbo',
  siteName: 'sanity-turbo',
  i18n: {
    locales: [
      { id: 'da', title: 'Dansk' },
      // { id: 'en', title: 'English' },
    ],
    defaultLocaleId: 'da',
  },
}
export default Appconfig
