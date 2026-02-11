import App from './App'
import ReactDOM from 'react-dom/client'
import Widget from '@hexlet/chatbot-v2'
import steps from '../__fixtures__/basic-steps.js'
import '@hexlet/chatbot-v2/styles'

const container = document.getElementById('root')
ReactDOM.createRoot(container).render(Widget(steps))
  .render(<App/>)
