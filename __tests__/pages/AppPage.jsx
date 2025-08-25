import { render, screen } from '@testing-library/react'
import App from '../../src/App.jsx'
import ChatWidgetPage from './ChatWidgetPage.js'

export default class AppPage extends ChatWidgetPage {
  constructor(steps) {
    super(steps)
  }

  async open() {
    render(<App steps={this.steps} />)

    const openBtn = await screen.findByRole('button', { name: /открыть чат/i })
    await this.user.click(openBtn)

    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }
}
