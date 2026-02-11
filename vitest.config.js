/* global process */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SUPPRESS = process.env.IMPLEMENTATION_NAME === 'right'

export default defineConfig({
  plugins: [react()],

  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  ssr: {
    noExternal: ['@hexlet/chatbot-v2'],
  },

  optimizeDeps: {
    exclude: ['@hexlet/chatbot-v2'],
  },

  test: {
    setupFiles: ['./vitest.setup.js'],
    environment: 'jsdom',
    globals: true,

    include: ['**/*.{test,spec}.{c,m,mt,js,jsx,ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**'],

    onConsoleLog(type, message) {
      const noise = /(Invalid hook call|ReactDOM\.render is no longer supported|JSDOM|Warning:)/i
      if ((type === 'warn' || type === 'error') && noise.test(String(message))) {
        if (SUPPRESS) return false
      }
    },
  },
})
