import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Widget from './mocks/FlowbotWidget.stub.jsx'
import steps from '../__fixtures__/basic-steps.js'
import { toRegex } from './helpers/test-utils.js'

const openBtnName = /open widget|Открыть\s*Чат/i

test('виджет рендерится без ошибок и показывает приветствие после клика', async () => {
  render(<Widget steps={steps} />)

  const openBtn = await screen.findByRole('button', { name: openBtnName })
  expect(openBtn).toBeInTheDocument()

  await userEvent.click(openBtn)

  const firstMsg = steps[0].messages[0]
  expect(await screen.findByText(toRegex(firstMsg))).toBeInTheDocument()
})

test('открывает диалог после клика', async () => {
  render(<Widget steps={steps} />)

  const openBtn = await screen.findByRole('button', { name: openBtnName })
  await userEvent.click(openBtn)

  expect(await screen.findByRole('dialog')).toBeInTheDocument()
})
