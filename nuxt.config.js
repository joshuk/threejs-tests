import meta from './static/data/meta.json'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: meta.data.siteTitle + ' | ' + meta.data.siteSlogan,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: meta.data.siteDescription },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'canonical', rel: 'canonical', href: meta.data.socialUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: meta.data.socialUrl },
      { name: 'twitter:creator', content: meta.data.socialHandle },
      { hid: 'twitter:image', name: 'twitter:image', content: meta.data.socialCard },
      { property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: meta.data.siteTitle },
      { hid: 'og:description', property: 'og:description', content: meta.data.siteDescription },
      { hid: 'og:url', property: 'og:url', content: meta.data.socialUrl },
      { property: 'og:site_name', content: meta.data.siteName },
      { hid: 'og:image', property: 'og:image', content: meta.data.socialCard }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/framework.css'],

  // Global Scss
  styleResources: {
    scss: ['@/assets/scss/_functions.scss', '@/assets/scss/_variables.scss', '@/assets/scss/_mixins.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Locomotive Scroll (part of locomotive)
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources', '@nuxtjs/svg'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // Firebase module (part of firebase)
  ],

  // Firebase
  // Firebase (part of firebase)

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: [
        require('postcss-px2rem')({
          remUnit: 16
        })
      ]
    },
    transpile: [
      'three'
    ]
  },

  // Allows mobile testing on same network
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
}
