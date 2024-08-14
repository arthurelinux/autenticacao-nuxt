// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css'
  ],
  build: {
    transpile: ['bootstrap']
  },
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],
  // vite: {
  //   plugins: [
  //     // Desative o plugin vite-plugin-inspect se estiver causando problemas

  //     // require('vite-plugin-inspect')()
  //   ]
  // }
})
