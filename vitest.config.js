import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const r = (p) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@hexlet/chatbot-v2/dist/init.css': r('__tests__/empty-css.js'),
      '@hexlet/chatbot-v2/styles': r('__tests__/empty-css.js'),
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
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
})



 