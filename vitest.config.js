import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const configDir = path.dirname(fileURLToPath(import.meta.url))
const resolveFromConfigDir = relativePath => path.resolve(configDir, relativePath)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hexlet/chatbot-v2/dist/init.css': resolveFromConfigDir('__tests__/empty-css.js'),
      '@hexlet/chatbot-v2/styles': resolveFromConfigDir('__tests__/empty-css.js'),
    },
  },
  ssr: {
    noExternal: ['@hexlet/chatbot-v2'],
  },
  optimizeDeps: {
    exclude: ['@hexlet/chatbot-v2'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: [resolveFromConfigDir('vitest.setup.js')],
    globals: true,
  },
})
