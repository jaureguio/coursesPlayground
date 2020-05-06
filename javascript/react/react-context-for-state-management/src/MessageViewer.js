import React, { useContext } from 'react';
import { EmailContext } from './EmailContext';

function MessageViewer() {
  const { currentEmail, handleSelectEmail } = useContext(EmailContext)
  return (
    <div className="MessageViewer">
      <button onClick={() => handleSelectEmail(null)}>
        Back
      </button>
      <h2>{currentEmail.subject}</h2>
      <div>{currentEmail.body}</div>
    </div>
  );
}

export default MessageViewer;
