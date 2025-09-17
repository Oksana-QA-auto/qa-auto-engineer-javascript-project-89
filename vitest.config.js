import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const configDirectory = path.dirname(fileURLToPath(import.meta.url))
const resolveFromConfig = (relativePath) => path.resolve(configDirectory, relativePath)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hexlet/chatbot-v2/dist/init.css': resolveFromConfig('__tests__/empty-css.js'),
      '@hexlet/chatbot-v2/styles': resolveFromConfig('__tests__/empty-css.js'),
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
    setupFiles: [
      resolveFromConfig('vitest.setup.js'),
      resolveFromConfig('__tests__/setup-expect.js'),
    ],
    globals: true,
  },
})

