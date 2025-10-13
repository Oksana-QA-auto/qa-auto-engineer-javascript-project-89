import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@hexlet/chatbot-v2', async () => {
  const React = await import('react')

  const Widget = ({ steps = [] }) => {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Открыть Чат
        </button>
        {open && (
          <div role="dialog">
            {steps?.[0]?.messages?.[0]}
          </div>
        )}
      </>
    )
  }

  return { default: Widget }
})

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn()
}

import steps from '../__fixtures__/basic-steps.js'
import { toRegex } from './helpers/test-utils.js'
import { startButtonText } from './helpers/texts.js'
import Widget from '@hexlet/chatbot-v2'

test('виджет рендерится без ошибок', async () => {
  render(<Widget steps={steps} />)
  const user = userEvent.setup()

  const openBtn = await screen.findByRole('button', {
    name: toRegex(startButtonText),
  })
  await user.click(openBtn)

  const welcome = steps[0].messages[0]
  expect(await screen.findByText(toRegex(welcome))).toBeInTheDocument()
})
