import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawAppUrl = env.VITE_APP_URL ?? 'https://onet-connect.com'
  const appUrl = rawAppUrl.replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'html-og-url',
        transformIndexHtml(html) {
          return html.replace(/__VITE_APP_URL__/g, appUrl)
        },
      },
    ],
  }
})
