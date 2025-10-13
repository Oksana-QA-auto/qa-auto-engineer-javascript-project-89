import './mocks/integration.mocks.jsx'
import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import AppPage from './pages/AppPage.jsx'
import { within } from '@testing-library/react'
import steps from '../__fixtures__/basic-steps.js'

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('Интеграция виджета в приложение', () => {
  test('открывает виджет и показывает приветствие; форма остаётся работоспособной', async () => {
    const page = new AppPage(steps)

    await page.open()

    expect(
      await within(page.dialog).findByRole('heading', { name: /привет/i })
    ).toBeInTheDocument()

    expect(
      within(page.dialog).getByRole('button', { name: /закрыть|close/i })
    ).toBeInTheDocument()

    await page.close()

    expect(page.queryDialog()).not.toBeInTheDocument()
    expect(page.openButton()).toHaveFocus()
  })
})
