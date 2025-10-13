import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../src/App.jsx'

export default class AppPage {
  constructor(steps) {
    this.steps = steps
    this.user = userEvent.setup()
    this.dialog = null
  }

  renderApp() {
    render(<App steps={this.steps} />)
  }

  openButton() {
    return screen.getByRole('button', { name: /открыть чат|open widget/i })
  }

  async open() {
    this.renderApp()
    await this.user.click(this.openButton())
    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }

  queryDialog() {
    return screen.queryByRole('dialog')
  }

  async clickStartButton() {
    const btn = within(this.dialog).getAllByRole('button').find(Boolean)
    await this.user.click(btn)
  }

  async close() {
    const btn = within(this.dialog).getByLabelText(/закрыть|close/i)
    await this.user.click(btn)

    await waitFor(() => expect(this.queryDialog()).not.toBeInTheDocument())
    await waitFor(() => expect(this.openButton()).toHaveFocus())
  }

  async reopen() {
    await this.user.click(this.openButton())
    this.dialog = await screen.findByRole('dialog')
    return this.dialog
  }

  async openCloseRapidly(times = 2) {
    for (let i = 0; i < times; i += 1) {
      await this.reopen()
      await this.close()
    }
  }

  findTextInDialog(rx) {
    return within(this.dialog).findByText(rx)
  }

  emailInput()    { return screen.getByLabelText(/email/i); }
  passwordInput() { return screen.getByLabelText(/пароль/i); }
  addressInput()  { return screen.getByLabelText(/адрес/i); }
  cityInput()     { return screen.getByLabelText(/город/i); }
  countrySelect() { return screen.getByLabelText(/страна/i); }
  rulesCheckbox() { return screen.getByLabelText(/принять правила/i); }
  submitBtn()     { return screen.getByRole('button', { name: /зарегистрироваться/i }); }
  backBtn()       { return screen.getByRole('button', { name: /назад/i }); }

  async fillFormAndSubmit(data) {
  await this.user.clear(this.emailInput())
  if (data.email != null && data.email !== '') {
    await this.user.type(this.emailInput(), data.email)
  }

  await this.user.clear(this.passwordInput())
  if (data.password != null && data.password !== '') {
    await this.user.type(this.passwordInput(), data.password)
  }

  await this.user.clear(this.addressInput())
  if (data.address != null && data.address !== '') {
    await this.user.type(this.addressInput(), data.address)
  }

  await this.user.clear(this.cityInput())
  if (data.city != null && data.city !== '') {
    await this.user.type(this.cityInput(), data.city)
  }

  if (data.country != null && data.country !== '') {
    await this.user.selectOptions(this.countrySelect(), data.country)
  }

  const cb = this.rulesCheckbox()
  if (cb.checked !== !!data.acceptRules) {
    await this.user.click(cb)
  }

  await this.user.click(this.submitBtn())
  await screen.findByRole('table')
}

  async backToForm() {
    await this.user.click(this.backBtn())
    await screen.findByRole('button', { name: /зарегистрироваться/i })
  }
}
