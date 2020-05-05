import React from 'react';
import { UserConsumer } from './UserContext'

const MessageList = ({ currentUser }) => (
  <UserConsumer>  
    {({ currentUser }) => (
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {currentUser.firstName}! 🎉
        </div>
      </div>
    )}
  </UserConsumer>
);

export default MessageList;
