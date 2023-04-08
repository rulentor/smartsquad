/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
//import ViteComponents from 'vite-plugin-components'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteSSR from 'vite-ssr/plugin'
import getPageProps from './serverless/api/get-page-props'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    viteSSR(),
    //fs(),
    //ViteFS(),	
/*
    {
      // API mock-up
      configureServer({ middlewares }) {
        middlewares.use('/api/get-page-props', getPageProps)
      },
    },
*/	
    Vue({
      reactivityTransform: true,
	  //include: [/\.vue$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true, //dts: 'src/auto-imports.d.ts',
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
	  deep: true,
	  directives: true,
	  include: [/\.vue$/, /\.vue\?vue/],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
   // Unocss(),
    VitePWA({
      registerType: 'autoUpdate',
	  injectRegister: null,
      manifest: {
        /* */
      },	  
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [],		
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
    }),
	Inspect(),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})

