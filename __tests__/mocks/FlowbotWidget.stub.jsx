import React from 'react'

export default function Widget({ steps = [] }) {
  const [open, setOpen] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(steps[0]?.id ?? null)
  const endRef = React.useRef(null)

  const currentStep = steps.find((step) => step.id === currentId)

  const handleNext = (nextStepId) => setCurrentId(nextStepId)

  React.useEffect(() => {
    const endElement = endRef.current
    if (open && endElement && typeof endElement.scrollIntoView === 'function') {
      endElement.scrollIntoView({ block: 'end' })
    }
  }, [open, currentId])

  return (
    <>
      {!open && (
        <button
          type="button"
          aria-label="open widget"
          onClick={() => setOpen(true)}
        >
          Открыть Чат
        </button>
      )}

      {open && currentStep && (
        <div role="dialog" aria-label="chat widget">
          {/* Сообщения текущего шага */}
          {currentStep.messages?.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}

          {/* Кнопки переходов */}
          <div>
            {currentStep.buttons?.map((btn, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNext(btn.nextStepId)}
              >
                {btn.text}
              </button>
            ))}
          </div>

          {/* Якорь для автоскролла */}
          <div ref={endRef} />

          <button type="button" onClick={() => setOpen(false)}>
            закрыть чат
          </button>
        </div>
      )}
    </>
  )
}
