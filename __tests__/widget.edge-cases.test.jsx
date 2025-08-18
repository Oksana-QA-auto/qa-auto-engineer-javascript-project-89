import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import Widget from '@hexlet/chatbot-v2';
import fixtureSteps from '../__fixtures__/basic-steps.js';

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const escapeForRegExp = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const assertArray = (value, label = 'value') => {
  if (!Array.isArray(value)) {
    throw new Error(
      `${label} is not an array (got ${typeof value}).\n` +
      `* Проверь импорт '../__fixtures__/basic-steps.js'\n` +
      `* и что там экспортируется default [...] (массив шагов)`
    );
  }
};

async function openWidgetWith(stepsToUse) {
  assertArray(stepsToUse, 'stepsToUse');

  render(Widget(stepsToUse));

  const user = userEvent.setup();

  const openBtn = await screen.findByRole('button', { name: /открыть чат/i });
  await user.click(openBtn);

  const dialog = await screen.findByRole('dialog');
  return { user, dialog };
}

describe('Widget edge cases', () => {
  test('handles missing nextStepId gracefully (no crash, content stays the same)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    const firstStep = steps[0];
    const firstMessage = firstStep.messages[0];

    firstStep.buttons[0].nextStepId = undefined;

    const { user, dialog } = await openWidgetWith(steps);

    expect(
      within(dialog).getByText(new RegExp(escapeForRegExp(firstMessage), 'i')),
    ).toBeInTheDocument();

    const firstButtonText = firstStep.buttons[0].text;
    await user.click(
      within(dialog).getByRole('button', {
        name: new RegExp(escapeForRegExp(firstButtonText), 'i'),
      }),
    );

    expect(
      within(dialog).getByText(new RegExp(escapeForRegExp(firstMessage), 'i')),
    ).toBeInTheDocument();
  });

  test('renders step without buttons (only messages and close control are present)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    steps.push({
      id: 'plain',
      messages: ['Это простой шаг без кнопок.'],
      buttons: [],
    });

    steps[0].buttons[0].nextStepId = 'plain';

    const { user, dialog } = await openWidgetWith(steps);

    const firstButtonText = steps[0].buttons[0].text;
    await user.click(
      within(dialog).getByRole('button', {
        name: new RegExp(escapeForRegExp(firstButtonText), 'i'),
      }),
    );

    expect(
      within(dialog).getByText(/простой шаг без кнопок/i),
    ).toBeInTheDocument();

    expect(
      within(dialog).getByRole('button', { name: /x|close/i }),
    ).toBeInTheDocument();

    const allButtons = within(dialog).getAllByRole('button');
    expect(allButtons).toHaveLength(1);
  });

  test('escapes HTML in messages (no tags are injected)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    const htmlLike = '<b>никакого HTML тут быть не должно</b>';
    steps[0].messages.unshift(htmlLike);

    const { dialog } = await openWidgetWith(steps);

    expect(
      within(dialog).getByText(new RegExp(escapeForRegExp(htmlLike))),
    ).toBeInTheDocument();

    expect(
      within(dialog).queryByText((_, node) => node?.tagName === 'B'),
    ).toBeNull();
  });

  test('state resets after close & reopen (returns to the first step)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    const { user, dialog } = await openWidgetWith(steps);

    const firstStep = steps[0];
    const firstMessage = firstStep.messages[0];

    const firstButtonText = firstStep.buttons[0].text;
    await user.click(
      within(dialog).getByRole('button', {
        name: new RegExp(escapeForRegExp(firstButtonText), 'i'),
      }),
    );

    const closeBtn = within(dialog).getByRole('button', { name: /x|close/i });
    await user.click(closeBtn);

    const reopenBtn = await screen.findByRole('button', { name: /открыть чат/i });
    await user.click(reopenBtn);
    const reopenedDialog = await screen.findByRole('dialog');

    expect(
      within(reopenedDialog).getByText(
        new RegExp(escapeForRegExp(firstMessage), 'i'),
      ),
    ).toBeInTheDocument();
  });
});

