import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const closeBtn = (
      within(this.dialog).queryByRole('button', { name: /закрыть/i })
      ?? within(this.dialog).getByRole('button', { name: /x|close/i })
    )
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

async findTextInDialog(text) {
  const normalize = (s) => (s ?? '').replace(/\s+/g, ' ').trim()

  const firstChunk = text.split(/\s+/).slice(0, 6).join(' ')
  const re = new RegExp(firstChunk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')

  const byParagraph = (_content, node) => {
    const isP = node?.tagName?.toLowerCase() === 'p'
    if (!isP) return false

    const full = normalize(node.textContent)
    return re.test(full)
  }

  const matches = await within(this.dialog).findAllByText(byParagraph)
  return matches.at(-1)
  }

  async clickButtonByText(text) {
    const btn = await within(this.dialog).findByRole('button', { name: toRegex(text) })
    await this.user.click(btn)
  }

  getAllButtonsInDialog() {
    return within(this.dialog).getAllByRole('button')
  }

  getCloseButton() {
    return (
      within(this.dialog).queryByRole('button', { name: /закрыть/i })
      ?? within(this.dialog).getByRole('button', { name: /x|close/i })
    )
  }
}
