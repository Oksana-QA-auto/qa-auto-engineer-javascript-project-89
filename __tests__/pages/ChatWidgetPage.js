import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { toRegex } from '../helpers/test-utils.js'

export default class ChatWidgetPage {
  constructor(steps) {
    this.steps = steps
    this.user = userEvent.setup()
    this.dialog = null
  }

  async open() {
    render(Widget(this.steps))
    const openBtn = await screen.findByRole('button', { name: /открыть чат/i })
    await this.user.click(openBtn)
    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }

  async close() {
    const closeBtn =
      within(this.dialog).queryByRole('button', { name: /закрыть/i }) ??
      within(this.dialog).getByRole('button', { name: /x|close/i })

    await this.user.click(closeBtn)
  }

  async reopen() {
    const openBtn = await screen.findByRole('button', { name: /открыть чат/i })
    await this.user.click(openBtn)
    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }

  get openButton() {
    return screen.getByRole('button', { name: /открыть чат/i })
  }

  queryDialog() {
    return document.body.querySelector('[role="dialog"]')
  }

  getAllButtonsInDialog() {
    return within(this.dialog).getAllByRole('button')
  }

  getCloseButton() {
    return (
      within(this.dialog).queryByRole('button', { name: /закрыть/i }) ??
      within(this.dialog).getByRole('button', { name: /x|close/i })
    )
  }

  async clickButtonByText(text) {
    const btn = await within(this.dialog).findByRole('button', { name: toRegex(text) })
    await this.user.click(btn)
  }

  async clickStartButton() {
    const firstButtonText = this.steps[0].buttons[0].text
    await this.clickButtonByText(firstButtonText)
  }

  expectOptionsVisible(stepIndex = 0) {
    const labels = this.steps[stepIndex].buttons.map((b) => b.text)
    for (const label of labels) {
      expect(
        within(this.dialog).getByRole('button', { name: toRegex(label) })
      ).toBeInTheDocument()
    }
  }

  async findTextInDialog(messageOrString) {
    const text =
      typeof messageOrString === 'string' ? messageOrString : messageOrString?.text ?? ''

    const normalizeText = (s) => (s ?? '').replace(/\s+/g, ' ').trim()

    const firstChunk = text.split(/\s+/).slice(0, 6).join(' ')
    const paragraphRegexp = new RegExp(firstChunk.replace(/[.+?^${}()|[\]\\]/g, '\\$&'), 'i')

    const byContent = (_content, node) => {
      const fullText = normalizeText(node.textContent)
      return paragraphRegexp.test(fullText)
    }

    const matches = await within(this.dialog).findAllByText(byContent)
    return matches.at(-1)
  }
}

