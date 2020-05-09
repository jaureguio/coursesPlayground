import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { UserProvider, UserContext } from './UserContext';
import { EmailProvider } from './EmailContext';
import { NotificationProvider } from './NotificationContext'

import './index.css';

function Root () {
  const { currentUser } = useContext(UserContext)
  return (
    currentUser ? <MainPage /> : <LoginPage />
  )
}

ReactDOM.render(
  <UserProvider>
    <NotificationProvider>
      <EmailProvider>
        <Root />
      </EmailProvider>
    </NotificationProvider>
  </UserProvider>,
  document.querySelector('#root')
);
