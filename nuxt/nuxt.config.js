export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nuxt-auth',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],

    axios: {
        // proxy: true
        baseURL: 'http://localhost:5000/api',
        credentials: false,
        proxyHeaders: false
    },
    auth: {
        strategies: {
            local: {
                // This settings depends on your backend and how it deals with sending and receiving data
                endpoints: {
                    login: { url: '/users/login', method: 'post', propertyName: 'data.token' },
                    user: { url: '/users/', method: 'get', propertyName: 'data' },
                    logout: false
                },
                token: {
                    name: 'x-auth-token',
                    type: ''
                }
            }
        }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
