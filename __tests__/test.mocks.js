import { vi, beforeEach, afterEach } from 'vitest'

vi.mock('@hexlet/chatbot-v2/dist/init.css', () => ({}), { virtual: true })
vi.mock('@hexlet/chatbot-v2/styles', () => ({}), { virtual: true })

let scrollIntoViewSpy
let scrollToSpy

beforeEach(() => {
  scrollIntoViewSpy = vi.fn()
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: scrollIntoViewSpy,
  })

  scrollToSpy = vi.fn()
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: scrollToSpy,
  })
})

afterEach(() => {
  vi.clearAllMocks()

  delete Element.prototype.scrollIntoView
  delete window.scrollTo
})

export { scrollIntoViewSpy, scrollToSpy }

