import React, { useContext } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageViewer from './MessageViewer'
import { EmailContext } from './EmailContext'

function MainPage() {
  const { currentEmail } = useContext(EmailContext)

  return (
    <main>
      <Header />
      { currentEmail ? <MessageViewer /> : <MessageList /> }
    </main>
  );
}

export default MainPage;
