import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const setupFile = fileURLToPath(new URL('./__tests__/setup-expect.js', import.meta.url))

export default defineConfig({
  plugins: [react()],

  ssr: {
    noExternal: ['@hexlet/chatbot-v2'],
  },

  optimizeDeps: {
    exclude: ['@hexlet/chatbot-v2'],
  },

  test: {
    environment: 'jsdom',
    setupFiles: [setupFile],
    globals: true,

    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)', '**/*.suite.{js,jsx,ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**'],

    onConsoleLog(type, message) {
      if (
        (type === 'warn' || type === 'error') &&
        /Invalid hook call|ReactDOM\.render is no longer supported|JSDOM|Warning:/.test(
          String(message)
        )
      ) {
        return false
      }
    },
  },
})
