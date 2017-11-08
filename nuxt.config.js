module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Librarify - A World-wide Library',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { 'http-equiv': 'content-type', content: 'text/html; charset=UTF-8' },
      { hid: 'description', name: 'description', content: 'Project Librarify (nuxt+bulma+fb)' }
    ] // ,
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    // ]
  },
  mode: 'spa',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vuelidate',
      'firebase'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    }
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/bulma',
    '@nuxtjs/font-awesome'
  ],
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/vuelidate',
    '~/plugins/fireauth'
  ],
  router: {
    middleware: 'router-auth'
  }
}
