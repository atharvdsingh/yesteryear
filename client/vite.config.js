import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api/v1/user"),
        },
        "/blog": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/blog/, "/api/v1/blog"),
        }
      }
    },
    plugins: [react(), tailwindcss()],
  }
})

