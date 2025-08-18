import '@testing-library/jest-dom/vitest';
import { within } from '@testing-library/react';
import fixtureSteps from '../__fixtures__/basic-steps.js';

import ChatWidgetPage from './pages/ChatWidgetPage.js';
import { deepClone, assertArray, iRe } from './helpers/test-utils.js';

describe('Widget edge cases', () => {
  test('handles missing nextStepId gracefully (no crash, content stays the same)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    steps[0].buttons[0].nextStepId = undefined;

    const page = new ChatWidgetPage(steps);
    await page.open();

    const firstMessage = steps[0].messages[0];
    const firstButtonText = steps[0].buttons[0].text;

    await page.clickButtonByText(firstButtonText);
    expect(await within(page.dialog).findByText(iRe(firstMessage))).toBeInTheDocument();
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

    const page = new ChatWidgetPage(steps);
    await page.open();

    const firstButtonText = steps[0].buttons[0].text;
    await page.clickButtonByText(firstButtonText);

    expect(await within(page.dialog).findByText(/простой шаг без кнопок/i)).toBeInTheDocument();
    expect(page.getAllButtonsInDialog()).toHaveLength(1);
    expect(page.getCloseButton()).toBeInTheDocument();
  });

  test('escapes HTML in messages (no tags are injected)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    const htmlLike = '<b>никакого HTML тут быть не должно</b>';
    steps[0].messages.unshift(htmlLike);

    const page = new ChatWidgetPage(steps);
    await page.open();

    expect(await within(page.dialog).findByText(iRe(htmlLike))).toBeInTheDocument();
    expect(within(page.dialog).queryByText((_, node) => node?.tagName === 'B')).toBeNull();
  });

  test('state resets after close & reopen (returns to the first step)', async () => {
    const steps = deepClone(fixtureSteps);
    assertArray(steps, 'fixtureSteps clone');

    const page = new ChatWidgetPage(steps);
    await page.open();

    const firstMessage = steps[0].messages[0];
    const firstButtonText = steps[0].buttons[0].text;

    await page.clickButtonByText(firstButtonText);

    await page.close();
    await page.reopen();

    expect(await within(page.dialog).findByText(iRe(firstMessage))).toBeInTheDocument();
  });
});


