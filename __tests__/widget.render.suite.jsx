import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Widget from '@hexlet/chatbot-v2'
import steps from '../__fixtures__/basic-steps.js'
import { toRegex } from './helpers/test-utils.js'
import { startButtonText } from './helpers/texts.js'

test('виджет рендерится без ошибок', async () => {
  render(Widget(steps))

  const openBtn = await screen.findByRole('button', { name: toRegex(startButtonText) })
  expect(openBtn).toBeInTheDocument()

  await userEvent.click(openBtn)

  const firstMsg = steps[0].messages[0]
  expect(await screen.findByText(toRegex(firstMsg))).toBeInTheDocument()
})
