import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Widget from '@hexlet/chatbot-v2';
import fixtureSteps from '../__fixtures__/basic-steps.js';

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function openWidget() {
  const user = userEvent.setup();
  const openButton = await screen.findByRole('button', { name: /открыть чат/i });
  await user.click(openButton);
  const dialog = await screen.findByRole('dialog');
  return { user, dialog };
}

function getNextStepFromFirstButton() {
  const nextId = fixtureSteps[0].buttons[0].nextStepId;
  return fixtureSteps.find((step) => step.id === nextId);
}

describe('Widget interactions', () => {
  test('виджет открывается и показывает приветствие и первую кнопку', async () => {
    render(Widget(fixtureSteps));

    const { dialog } = await openWidget();

    const firstMessage = fixtureSteps[0].messages[0];
    expect(
      await within(dialog).findByText(new RegExp(escapeRegExp(firstMessage), 'i')),
    ).toBeInTheDocument();

    const firstButtonText = fixtureSteps[0].buttons[0].text;
    expect(
      await within(dialog).findByRole('button', {
        name: new RegExp(escapeRegExp(firstButtonText), 'i'),
      }),
    ).toBeInTheDocument();
  });

  test('переход на следующий шаг после клика по первой кнопке', async () => {
    render(Widget(fixtureSteps));

    const { user, dialog } = await openWidget();

    const firstButtonText = fixtureSteps[0].buttons[0].text;
    await user.click(
      await within(dialog).findByRole('button', {
        name: new RegExp(escapeRegExp(firstButtonText), 'i'),
      }),
    );

    const nextStep = getNextStepFromFirstButton();
    const nextMessage = nextStep.messages[0];

    expect(
      await within(dialog).findByText(new RegExp(escapeRegExp(nextMessage), 'i')),
    ).toBeInTheDocument();
  });

  test('при появлении нового сообщения вызывается scrollIntoView', async () => {
    const spy = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => {});

    render(Widget(fixtureSteps));

    const { user, dialog } = await openWidget();

    const firstButtonText = fixtureSteps[0].buttons[0].text;
    await user.click(
      await within(dialog).findByRole('button', {
        name: new RegExp(escapeRegExp(firstButtonText), 'i'),
      }),
    );

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('чат закрывается и фокус возвращается на кнопку "Открыть чат"', async () => {
    render(Widget(fixtureSteps));

    const { user } = await openWidget();
    const dialog = await screen.findByRole('dialog');

    const closeButton =
      within(dialog).queryByRole('button', { name: /закрыть/i }) ??
      within(dialog).getByRole('button', { name: /x|close/i });

    await user.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /открыть чат/i })).toHaveFocus();
  });
});



