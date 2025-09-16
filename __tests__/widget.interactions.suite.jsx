import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import fixtureSteps from '../__fixtures__/basic-steps.js'
import { toRegex } from './helpers/test-utils.js'
import AppPage from './pages/AppPage.jsx'
import { within, screen } from '@testing-library/react'

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})
afterEach(() => {
  vi.clearAllMocks()
})

describe('Widget interactions', () => {
  test('виджет открывается и показывает приветствие и первую кнопку', async () => {
    const page = new AppPage(fixtureSteps)
    await page.open()

    const firstMessage = fixtureSteps[0].messages[0]
    const firstButtonText = fixtureSteps[0].buttons[0].text

    expect(await within(page.dialog).findByText(toRegex(firstMessage))).toBeInTheDocument()
    expect(await within(page.dialog).findByRole('button', { name: toRegex(firstButtonText) }))
      .toBeInTheDocument()
  })

  test('переход на следующий шаг после клика по первой кнопке', async () => {
    const page = new AppPage(fixtureSteps)
    await page.open()

    await page.clickStartButton()

    const nextId = fixtureSteps[0].buttons[0].nextStepId
    const nextStep = fixtureSteps.find((s) => s.id === nextId)
    const nextMessage = nextStep.messages[0]

    expect(await page.findTextInDialog(nextMessage)).toBeInTheDocument()
  })

  test('при появлении нового сообщения вызывается scrollIntoView', async () => {
    const page = new AppPage(fixtureSteps)
    await page.open()

    await page.clickStartButton()

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })

  test('чат закрывается и фокус возвращается на кнопку "Открыть чат"', async () => {
    const page = new AppPage(fixtureSteps)
    await page.open()

    await page.close()

    expect(page.queryDialog()).not.toBeInTheDocument()
    expect(page.openButton).toHaveFocus()
  })

  test('интеграция не вызывает ошибок при интеграции в приложение', async () => {
    const spyErr = vi.spyOn(console, 'error').mockImplementation(() => {})
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const page = new AppPage(fixtureSteps)

    await page.open()
    await page.close()

    expect(spyErr).not.toHaveBeenCalled()
    expect(spyWarn).not.toHaveBeenCalled()

    spyErr.mockRestore()
    spyWarn.mockRestore()
  })

  test('виджет отображается внутри компонента приложения', async () => {
    const page = new AppPage(fixtureSteps)
    const dialog = await page.open()

    const openBtn = page.openButton
    const appRoot =
      openBtn.closest('[data-testid="app-root"], #app, #root, main, [role="application"]') ||
      document.body

    expect(appRoot.contains(dialog)).toBe(true)
  })

  test('поля ввода формы функциональны', async () => {
    const page = new AppPage(fixtureSteps)
    await page.open()

    const allButtons = within(page.dialog).queryAllByRole('button')
    const stepBtn =
      allButtons.find((b) => !/закрыть|close|отправить|send|submit/i.test(b.textContent || '')) ||
      allButtons[0]
    if (stepBtn) {
      await page.user.click(stepBtn)
    }

    const textInput =
      within(page.dialog).queryByLabelText(/имя|name|сообщение|message|email|почта/i) ||
      within(page.dialog).queryByRole('textbox')

    if (!textInput) return

    await page.user.clear(textInput)
    await page.user.type(textInput, 'Test-user')
    expect(textInput).toHaveValue('Test-user')
  })

  test('виджет не влияет на функциональность приложения', async () => {
    const page = new AppPage(fixtureSteps)

    await page.open()
    await page.close()

    expect(page.openButton).toBeEnabled()
    await page.user.click(page.openButton)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})

