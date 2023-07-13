// https://v3.nuxtjs.org/api/configuration/nuxt.config



export default defineNuxtConfig({
  telemetry: false,
  vite: {
    assetsInclude: ["**/*.xlsx"]
  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss','@nuxtjs/color-mode', 'nuxt-lodash' ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    // config: {},
    injectPosition: 'first',
    viewer: true  
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
    // content.extendParser allows us to hook into the parsing step
    content: {
    },
})
