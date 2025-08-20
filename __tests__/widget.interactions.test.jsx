import './helpers/setup-tests.js'
import { describe, test, expect, vi } from 'vitest'
import fixtureSteps from '../__fixtures__/basic-steps.js'
import { iRe } from './helpers/test-utils.js'
import ChatWidgetPage from './pages/ChatWidgetPage.js'
import { within } from '@testing-library/react'

describe('Widget interactions', () => {
  test('виджет открывается и показывает приветствие и первую кнопку', async () => {
    const page = new ChatWidgetPage(fixtureSteps)
    await page.open()

    const firstMessage = fixtureSteps[0].messages[0]
    const firstButtonText = fixtureSteps[0].buttons[0].text

    expect(await within(page.dialog).findByText(iRe(firstMessage))).toBeInTheDocument()
    expect(await within(page.dialog).findByRole('button', { name: iRe(firstButtonText) }))
      .toBeInTheDocument()
  })

  test('переход на следующий шаг после клика по первой кнопке', async () => {
    const page = new ChatWidgetPage(fixtureSteps)
    await page.open()

    const firstButtonText = fixtureSteps[0].buttons[0].text
    await page.clickButtonByText(firstButtonText)

    const nextId = fixtureSteps[0].buttons[0].nextStepId
    const nextStep = fixtureSteps.find(s => s.id === nextId)
    const nextMessage = nextStep.messages[0]

    expect(await within(page.dialog).findByText(iRe(nextMessage))).toBeInTheDocument()
  })

  test('при появлении нового сообщения вызывается scrollIntoView', async () => {
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {})

    const page = new ChatWidgetPage(fixtureSteps)
    await page.open()

    const firstButtonText = fixtureSteps[0].buttons[0].text
    await page.clickButtonByText(firstButtonText)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('чат закрывается и фокус возвращается на кнопку "Открыть чат"', async () => {
    const page = new ChatWidgetPage(fixtureSteps)
    await page.open()

    await page.close()

    expect(page.queryDialog()).not.toBeInTheDocument()
    expect(page.openButton).toHaveFocus()
  })
})
