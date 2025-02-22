import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }
        `,
      },
    },
  },
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },
    resolve: {

      alias: {

        '@': './src',
        '@/components': './src/components',
        '@/pages': './src/pages',
        '@/assets': './src/assets',

      }

    },
    server: {
      host: true,  // This automatically binds to your local IP
      port: 8080,  // Use a fixed port
      strictPort: true, // Ensures the port doesn't change
      hmr: {
        clientPort: 8080, // Fixes HMR issues on external devices
      }
    }
,  
    manifest: {
      name: 'timesheet',
      short_name: 'timesheet',
      description: 'timesheet',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },

  })],
})