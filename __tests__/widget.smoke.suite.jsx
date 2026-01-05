import { test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

import steps from '../__fixtures__/basic-steps.js'
import { toRegex } from './helpers/test-utils.js'
import { startButtonText } from './helpers/texts.js'
import App from '../src/App.jsx'

test('виджет рендерится без ошибок', async () => {
  render(<App />)
  const user = userEvent.setup()

  const openBtn = await screen.findByRole('button', {
    name: toRegex(startButtonText),
  })
  await user.click(openBtn)

  const welcome = steps[0].messages[0]
  expect(await screen.findByText(toRegex(welcome))).toBeInTheDocument()
})
