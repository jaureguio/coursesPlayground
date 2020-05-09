import React, { useContext } from 'react';
import UserMenu from './UserMenu';
import { EmailContext } from './EmailContext'

const Header = () => {
  const { emails } = useContext(EmailContext)
  return ( 
    <header className="Header">
      <h2>
        MyMail 
      </h2>
      { emails.length ? <p>{emails.length} messages in total</p> : null }
      <UserMenu />
    </header>
  )
};

export default Header;
