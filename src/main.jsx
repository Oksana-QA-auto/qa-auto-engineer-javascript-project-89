import React from 'react'
import { createRoot } from 'react-dom/client'

import Widget from '@hexlet/chatbot-v2'
import steps from './steps.js'
import '@hexlet/chatbot-v2/styles'

const rootEl = document.getElementById('root')

createRoot(rootEl).render(
  <React.StrictMode>
    {Widget(steps)}
  </React.StrictMode>
)
