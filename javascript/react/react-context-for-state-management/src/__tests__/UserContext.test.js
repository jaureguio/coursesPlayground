import React, { useContext } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { UserContext, Provider, UserConsumer, UserProvider } from '../UserContext'
import { FAKE_USER } from '../api'

function TestComponent() {
  const value = useContext(UserContext)
  return (
    <div>
      {`${value}`}
    </div>
  )
}

test('default value is undefined', () => {
  const { container } = render(
    <TestComponent />
  )

  expect(container.querySelector('div').textContent).toEqual('undefined')
})

function TestComponent2() {
  const { currentUser } = useContext(UserContext)
  return <div>{currentUser.username}</div>
}
test('Initial user is FAKE_USER', () => {
  const { container } = render(
    <UserProvider>
      <TestComponent2 />
    </UserProvider>
  )

  expect(container.querySelector('div').textContent).toEqual(FAKE_USER.username)
})


function TestComponent3() {
  const { currentUser, onLogin } = useContext(UserContext)
  return (
    <>
      <div>{currentUser.username}</div>
      <button onClick={()=>onLogin({username: 'Esteban'})}></button>
    </>
  )
}

test('onLogin sets the user', () => {
  const { container } = render(
    <UserProvider>
      <TestComponent3 />
    </UserProvider>
  )

  fireEvent.click(container.querySelector('button'))
  expect(container.querySelector('div').textContent).toEqual('Esteban')
})


function TestComponent4() {
  const { currentUser, onLogout } = useContext(UserContext)
  return (
    <>
      <div>{(currentUser === null).toString()}</div>
      <button onClick={onLogout}></button>
    </>
  )
}

test('onLogout clears user', () => {
  const { container } = render(
    <UserProvider>
      <TestComponent4 />
    </UserProvider>
  )

  fireEvent.click(container.querySelector('button'))
  expect(container.querySelector('div').textContent).toEqual('true')
})