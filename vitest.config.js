import { defineConfig } from 'vitest/config'
import reactPlugin from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import jestDomMatchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
expect.extend(jestDomMatchers)

const configFileDirectory = path.dirname(fileURLToPath(import.meta.url))

const resolveFromConfigDirectory = (relativePath) =>
  path.resolve(configFileDirectory, relativePath)

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      '@hexlet/chatbot-v2/dist/init.css': resolveFromConfigDirectory('__tests__/empty-css.js'),
      '@hexlet/chatbot-v2/styles': resolveFromConfigDirectory('__tests__/empty-css.js'),
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
    setupFiles: [resolveFromConfigDirectory('vitest.setup.js')],
    globals: true,
  },
})
