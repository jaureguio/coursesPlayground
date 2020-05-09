import React, { useState, createContext } from 'react'
import { FAKE_USER } from './api'

let UserContext;
const { Provider, Consumer } = UserContext = createContext()

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(FAKE_USER)

  const context = {
    currentUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  function handleLogin (user) {
    setCurrentUser(user);
  };

  function handleLogout () {
    setCurrentUser(null);
  };

  return (
    <Provider value={context}>
      {children}
    </Provider>
  )
} 
export { UserProvider, Provider, Consumer as UserConsumer, UserContext}
