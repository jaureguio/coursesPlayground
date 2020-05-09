import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from '../EmailContext';
import MessageViewer from '../MessageViewer'

const email = {
  subject: 'Test email',
  body: 'This is a test email for message viewer'
}

test('view an email', () => {
  const { container } = render(
    <Provider value={{currentEmail: email}}>
      <MessageViewer />
    </Provider>
  )

  expect(container.querySelector("h2").textContent).toEqual(email.subject)
  expect(container.querySelector("h2 + div").textContent).toEqual(email.body)
})

test('Back button', () => {
  const mockBtn = jest.fn()
  const { container } = render(
    <Provider value={{ currentEmail: email, handleSelectEmail: mockBtn }}>
      <MessageViewer />
    </Provider>
  )

  fireEvent.click(container.querySelector('button'))
  expect(mockBtn).toBeCalledWith(null)
})