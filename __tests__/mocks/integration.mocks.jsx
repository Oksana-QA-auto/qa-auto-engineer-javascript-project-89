import React, { useRef, useState } from 'react'
import { vi } from 'vitest'

vi.mock('@hexlet/chatbot-v2', () => {
  function WidgetMock({ steps = [] }) {
    const [open, setOpen] = useState(false)
    const openBtnRef = useRef(null)

    const first = Array.isArray(steps) && steps.length > 0
      ? steps[0]
      : { messages: [], buttons: [] }

    const welcome = first?.messages?.[0] ?? ''
    const firstButtonText = first?.buttons?.[0]?.text ?? 'Начать разговор'

    const stepsCount = Array.isArray(steps) ? steps.length : 0

    const openDialog = () => setOpen(true)
    const closeDialog = () => {
      setOpen(false)
      queueMicrotask(() => openBtnRef.current?.focus())
    }

    return (
      <div data-steps-count={stepsCount}>
        <button type="button" ref={openBtnRef} onClick={openDialog}>
          Открыть чат
        </button>

        {open && (
          <div role="dialog" aria-label="chatbot">
            <p>{welcome}</p>

            <button
              type="button"
              aria-label="close"
              onClick={closeDialog}
            >
              Закрыть
            </button>

            {first?.buttons?.length ? (
              <button type="button">{firstButtonText}</button>
            ) : null}
          </div>
        )}
      </div>
    )
  }

  const widget = (steps) => <WidgetMock steps={steps} />

  return { default: widget }
})

