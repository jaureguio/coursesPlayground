import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { EmailContext } from './EmailContext';

const MessageList = () => {
  const { currentUser } = useContext(UserContext);
  const { emails, status, handleSelectEmail } = useContext(EmailContext);  

  return (
    <div className="MessageList">
      {status === 'pending' ?
        <div className="no-messages">Loading...</div> :
        status === 'resolved' && emails.length === 0 ?
        <div className="no-messages">
          Your mailbox is empty, {currentUser.firstName}! 🎉
        </div> : 
        status === 'resolved' && emails ?
        <ul>
          {emails.map( email =>
            <MemoEmail 
              key={email.id} 
              email={email}
              onClick={handleSelectEmail}
            />
          )}
        </ul>
        : null
      }
    </div>
  )
};

const MemoEmail = React.memo(Email)
function Email({ email, onClick }) {
  return (
    <li onClick={() => onClick(email)}>
      <div className='subject'>{email.subject}</div>
      <div className='preview'>{email.preview}</div>
    </li>
  )
}
export default MessageList;
