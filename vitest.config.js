import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const SUPPRESS = process.env.IMPLEMENTATION_NAME === 'right'

export default defineConfig({
  plugins: [react()],

resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: resolve(process.cwd(), 'node_modules/react'),
      'react-dom': resolve(process.cwd(), 'node_modules/react-dom'),
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
    globals: true,

    setupFiles: ['./vitest.setup.js'],

    include: ['**/*.{test,spec}.{c,m,mt,jt,js,jsx,ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**'],

    onConsoleLog(type, message) {
      const noise = /(Invalid hook call|ReactDOM\.render is no longer supported|JSDOM|Warning:)/i
      if ((type === 'warn' || type === 'error') && noise.test(String(message))) {
        if (SUPPRESS) return false
      }
    },
  },
})
