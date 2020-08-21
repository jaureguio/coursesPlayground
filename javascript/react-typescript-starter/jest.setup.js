import "@testing-library/jest-dom/extend-expect"
import "jest-expect-message"
// Loads the window.fetch polyfill into our testing environment
import "whatwg-fetch"

// window.fetch = jest.fn()