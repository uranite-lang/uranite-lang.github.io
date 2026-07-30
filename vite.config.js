import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (
          req.method === 'GET' &&
          req.headers.accept?.includes('text/html') &&
          !url.startsWith('/@') &&
          !url.startsWith('/src/') &&
          !url.startsWith('/node_modules/') &&
          url !== '/' &&
          url !== '/index.html' &&
          !/\.(js|css|ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot|map|json)$/.test(url)
        ) {
          req.url = '/index.html'
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [spaFallback(), vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
