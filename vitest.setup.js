import '@testing-library/jest-dom/vitest'
import './__tests__/mocks/integration.mocks.jsx'

import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)

