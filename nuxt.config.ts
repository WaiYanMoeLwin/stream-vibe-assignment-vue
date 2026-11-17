// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/fonts', 'nuxt-viewport'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    apiKey: ''
  },
  ssr: false,
  viewport: {
    breakpoints: {
      desktop: 1440,
      laptop: 1024,
      tablet: 768,
      mobile: 320
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
