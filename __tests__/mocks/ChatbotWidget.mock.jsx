import React from 'react'

export default function Widget({ steps = [] }) {
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
