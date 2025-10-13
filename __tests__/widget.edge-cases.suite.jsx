import './mocks/integration.mocks.jsx'

import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { screen, within } from '@testing-library/react'
import AppPage from './pages/AppPage.jsx'
import steps from '../__fixtures__/basic-steps.js'

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})
afterEach(() => {
  vi.clearAllMocks()
})

describe('Widget edge-cases', () => {
  test('форма: некорректные данные не ломают интерфейс, сводка отображается как есть', async () => {
    const page = new AppPage(steps)
    page.renderApp()

    const bad = {
      email: 'user@test.io',
      password: '123',
      address: '',
      city: '',
      country: 'Россия',
      acceptRules: false,
    }

    await page.fillFormAndSubmit(bad)

    const table = await screen.findByRole('table')
    const tableQueries = within(table)

    expect(tableQueries.getByText('Email')).toBeInTheDocument()
    expect(tableQueries.getByText(bad.email)).toBeInTheDocument()

    expect(tableQueries.getByText('Пароль')).toBeInTheDocument()
    expect(tableQueries.getByText(bad.password)).toBeInTheDocument()

    const addressRow = tableQueries.getByText('Адрес').closest('tr')
    expect(within(addressRow).getAllByRole('cell')[1].textContent).toBe('')

    const cityRow = tableQueries.getByText('Город').closest('tr')
    expect(within(cityRow).getAllByRole('cell')[1].textContent).toBe('')

    expect(tableQueries.getByText('Страна')).toBeInTheDocument()
    expect(tableQueries.getByText(bad.country)).toBeInTheDocument()

    expect(tableQueries.getByText('Принять правила')).toBeInTheDocument()
    expect(tableQueries.getByText('false')).toBeInTheDocument()

    await page.backToForm()
    expect(page.submitBtn()).toBeInTheDocument()
  })

  test('виджет: быстрые циклы открытия/закрытия не ломают интерфейс, фокус возвращается на кнопку', async () => {
    const page = new AppPage(steps)

    await page.open()
    expect(await within(page.dialog).findByRole('heading', { name: /привет/i }))
      .toBeInTheDocument()
    await page.close()
    expect(page.openButton()).toHaveFocus()

    await page.openCloseRapidly(2)

    await page.reopen()
    expect(await within(page.dialog).findByRole('heading', { name: /привет/i }))
      .toBeInTheDocument()
    await page.close()
    expect(page.queryDialog()).not.toBeInTheDocument()
    expect(page.openButton()).toHaveFocus()
  })
})
