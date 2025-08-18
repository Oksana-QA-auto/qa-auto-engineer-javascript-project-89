import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Widget from '@hexlet/chatbot-v2';
import { iRe } from '../helpers/test-utils.js';

export default class ChatWidgetPage {
  constructor(steps) {
    this.steps = steps;
    this.user = userEvent.setup();
    this.dialog = null;
  }

  async open() {
    render(Widget(this.steps));
    const openBtn = await screen.findByRole('button', { name: /открыть чат/i });
    await this.user.click(openBtn);
    this.dialog = await screen.findByRole('dialog');
    return this.dialog;
  }

  async close() {
    const closeBtn =
      within(this.dialog).queryByRole('button', { name: /закрыть/i }) ??
      within(this.dialog).getByRole('button', { name: /x|close/i });
    await this.user.click(closeBtn);
  }

  async reopen() {
    const openBtn = await screen.findByRole('button', { name: /открыть чат/i });
    await this.user.click(openBtn);
    this.dialog = await screen.findByRole('dialog');
    return this.dialog;
  }

  get openButton() {
    return screen.getByRole('button', { name: /открыть чат/i });
  }

  queryDialog() {
    return document.body.querySelector('[role="dialog"]');
  }

  async findTextInDialog(text) {
    return within(this.dialog).findByText(iRe(text));
  }

  async clickButtonByText(text) {
    const btn = await within(this.dialog).findByRole('button', { name: iRe(text) });
    await this.user.click(btn);
  }

  getAllButtonsInDialog() {
    return within(this.dialog).getAllByRole('button');
  }

  getCloseButton() {
    return (
      within(this.dialog).queryByRole('button', { name: /закрыть/i }) ??
      within(this.dialog).getByRole('button', { name: /x|close/i })
    );
  }
}

 
