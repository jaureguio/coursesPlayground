import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import '@testing-library/cleanup-after-each'

import App from './App'

describe('App', () => {
  test('Renders without error', () => {
    render(<App />)
  })
})