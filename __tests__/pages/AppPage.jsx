import { render, screen, within, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../../src/App.jsx'
import ChatWidgetPage from './ChatWidgetPage.js'

export default class AppPage extends ChatWidgetPage {
  constructor(steps) {
    super(steps)
    this.dialog = null
  }

  async open() {
    return this.openWidget()
  }

  getStartButton() {
    return screen.getByRole('button', {
      name: /открыть чат|open chat|open widget/i,
    })
  }

  async openWidget() {
    render(<App steps={this.steps} />)

    const openBtn = await this.getStartButton()
    await this.user.click(openBtn)

    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }

  getCloseButton() {
    return within(this.dialog).getByRole('button', {
      name: /закрыть|close/i,
    })
  }

  async closeWidget() {
    const btn = this.getCloseButton()
    await this.user.click(btn)
  }

  async waitForModalToClose() {
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))
  }

  expectModalTitle(expectedTitle) {
    const titleEl =
      within(this.dialog).queryByRole('heading', { name: expectedTitle }) ??
      within(this.dialog).getByText(expectedTitle)
    expect(titleEl).toBeTruthy()
    return titleEl
  }

  getFormInputLabel(labelText) {
    return within(this.dialog).getByText(new RegExp(labelText, 'i'))
  }

  getFormInput(labelText) {
    return within(this.dialog).getByLabelText(new RegExp(labelText, 'i'))
  }

  async filloutForm(valuesMap) {
    for (const [label, value] of Object.entries(valuesMap)) {
      const input = this.getFormInput(label)
      await this.user.clear(input)
      await this.user.type(input, String(value))
    }
  }

  expectFormValues(valuesMap) {
    for (const [label, expected] of Object.entries(valuesMap)) {
      const input = this.getFormInput(label)
      expect(input.value).toBe(String(expected))
    }
  }

  async submitForm() {
    const submitBtn =
      within(this.dialog).queryByRole('button', {
        name: /отправить|send|submit/i,
      }) ?? within(this.dialog).getByText(/отправить|send|submit/i)

    await this.user.click(submitBtn)
    return submitBtn
  }

  async expectFormSubmission({ successText = /спасибо|успешно|success/i } = {}) {
    const ok = await screen.findByText(successText)
    expect(ok).toBeTruthy()
    return ok
  }
}
