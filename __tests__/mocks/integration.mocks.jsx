import React, { useRef, useState } from 'react'
import { vi } from 'vitest'

vi.mock('@hexlet/chatbot-v2', () => {
  function WidgetMock({ steps = [] }) {
    const [open, setOpen] = useState(false)
    const openBtnRef = useRef(null)

    const first = steps[0] || {
      messages: ['Привет!'],
      buttons: [{ text: 'Далее', nextStepId: null }],
    }

    const openDialog = () => setOpen(true)
    const closeDialog = () => {
      setOpen(false)
      queueMicrotask(() => openBtnRef.current?.focus())
    }

    const stepsCount = Array.isArray(steps) ? steps.length : 0

    return (
      <div data-steps-count={stepsCount}>
        <button
          ref={openBtnRef}
          aria-label="open widget"
          type="button"
          onClick={openDialog}
        >
          Открыть чат
        </button>

        {open && (
          <div role="dialog">
            <h2>Привет!</h2>

            <button aria-label="close" type="button" onClick={closeDialog}>
              Закрыть
            </button>

            {first?.buttons?.length ? (
              <button type="button">{first.buttons[0].text}</button>
            ) : null}
          </div>
        )}
      </div>
    )
  }

  return { default: WidgetMock }
})
