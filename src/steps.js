import exampleSteps from '@hexlet/chatbot-v2/example-steps'
import fixtureSteps from '../__fixtures__/basic-steps.js'

const raw = (import.meta.env.VITE_USE_FIXTURE ?? '')
  .toString()
  .replace(/['"]/g, '')
  .trim()
  .toLowerCase()

const useFixture = raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on'

console.log('[steps] useFixture =', useFixture, '(raw:', raw, ')')

export default useFixture ? fixtureSteps : exampleSteps

