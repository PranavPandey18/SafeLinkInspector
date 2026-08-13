import '@testing-library/jest-dom'

// Polyfill fetch if necessary
if (!globalThis.fetch) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  globalThis.fetch = require('cross-fetch')
}
