import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('Renders without error', () => {
    const { container } = render(<App />)

    fireEvent.click(container.querySelectorAll('button')[0])

    expect(container.querySelector('h1').textContent).toEqual('1')
  })
})

describe('true should be true', () => {
  expect(true).toEqual(true)
})
