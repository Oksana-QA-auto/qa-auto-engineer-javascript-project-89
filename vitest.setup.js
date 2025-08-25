/**
 * Тестовая среда jsdom (Vitest) не реализует scrollIntoView/scrollTo.
 * Подключаем jest-dom и добавляем небольшие полифиллы.
 */

import { expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.mock('@hexlet/chatbot-v2/dist/init.css', () => ({}), { virtual: true })
vi.mock('@hexlet/chatbot-v2/styles', () => ({}), { virtual: true })

if (!('scrollIntoView' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value() {},
    writable: true,
    configurable: true,
  })
}

if (typeof window.scrollTo !== 'function') {
  Object.defineProperty(window, 'scrollTo', {
    value() {},
    writable: true,
    configurable: true,
  })
}

