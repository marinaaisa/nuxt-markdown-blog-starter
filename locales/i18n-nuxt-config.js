const I18N = {
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_cookie_lang',
    alwaysRedirect: true
  },
  useCookie: true,
  alwaysRedirect: true,
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en/index.js'
    },
    {
      code: 'es',
      iso: 'es-ES',
      name: 'Español',
      file: 'es/index.js'
    }
  ],
  lazy: true,
  seo: false,
  langDir: '/locales/',
  defaultLocale: 'en',
  parsePages: false,
  pages: {
    'work/_slug': {
      es: '/trabajo/:slug'
    }
  }
}

module.exports = {
  I18N
}
