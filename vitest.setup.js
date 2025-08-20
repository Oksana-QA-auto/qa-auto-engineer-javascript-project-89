/**
 * Тестовая среда jsdom (которая используется Vitest) не реализует
 * Element.prototype.scrollIntoView. Виджет вызывает его на каждом сообщении,
 * из-за чего без заглушки тесты падают с ошибкой:
 *   "t.current.scrollIntoView is not a function".
 *
 * Добавлен минимальный полифилл-заглушка (no-op), чтобы сохранить API
 * и не тестировать сам скролл в юнит-тестах.
 **/
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('@hexlet/chatbot-v2/dist/init.css', () => ({}), { virtual: true })
vi.mock('@hexlet/chatbot-v2/styles', () => ({}), { virtual: true })

if (!('scrollIntoView' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: function scrollIntoView() {},
    writable: true,
    configurable: true,
  })
}

if (typeof window.scrollTo !== 'function') {
  Object.defineProperty(window, 'scrollTo', {
    value: () => {},
    writable: true,
    configurable: true,
  })
}
