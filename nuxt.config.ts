// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  ssr: false,
  alias: {
    '@vue/devtools-api': '@vue/devtools-api',
  },
  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: {host: process.env.TAURI_DEV_HOST || 'localhost'},
  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    // https://github.com/tauri-apps/tauri/security/advisories/GHSA-2rcp-jvr4-r259
    define: {
      TAURI_PLATFORM: JSON.stringify(process.env.TAURI_PLATFORM),
      TAURI_ARCH: JSON.stringify(process.env.TAURI_ARCH),
      TAURI_FAMILY: JSON.stringify(process.env.TAURI_FAMILY),
      TAURI_PLATFORM_VERSION: JSON.stringify(
          process.env.TAURI_PLATFORM_VERSION
      ),
      TAURI_PLATFORM_TYPE: JSON.stringify(process.env.TAURI_PLATFORM_TYPE),
      TAURI_DEBUG: JSON.stringify(process.env.TAURI_DEBUG),
    },
    server: {
      // Tauri requires a consistent port
      strictPort: true,
    },
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
  },
  srcDir: 'src',
  components: [
    {
      path: '~/components/ui',
      extensions: ['vue'],
      priority: 2,
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'radix-vue/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-tiptap-editor'
  ],
  pinia: {
    storesDirs: ['src/stores/**'],
  },
  colorMode: {
    classSuffix: '',
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'fontsource',
        weights: ['400', '500', '600', '700', '800', '900'],
      },
      {
        name: 'Geist Mono',
        provider: 'fontsource',
        weights: ['400', '500', '600', '700', '800', '900'],
      },
    ],
  },
  tailwindcss: {
    cssPath: './src/assets/css/tailwind.css',
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/components/ui',
  }
})