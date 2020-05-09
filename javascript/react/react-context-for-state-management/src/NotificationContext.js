import React, { createContext, useState, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

let NotificationContext;
const { Provider } = NotificationContext = createContext()

function NotificationProvider(props) {
  const [messages, setMessages] = useState([])
  const { currentUser } = useContext(UserContext)

  useEffect(() => () => setMessages([]), [currentUser])
  useEffect(() => {
    if(currentUser) {
      const cleaningFrequency = setInterval(() => cleanMessages(), 2000)
      return () => {clearInterval(cleaningFrequency)}
    }
  }, [currentUser])

  const context = {
    messages,
    notify: addMessage,
  }

  function addMessage(text) {
    setMessages(messages => [
      ...messages,
      {
        id: Math.random(),
        text,
        addedAt: new Date().getTime(),
      }
    ])
  }

  function removeMessage({ id }) {
    setMessages(messages => (
      messages.filter(m => id !== m.id)
    ))
  }

  function cleanMessages() {
    let now = new Date().getTime
    setMessages(
      messages.filter(msg => (now - msg.addedAt) < 3000)
    )
  }
  
  return (
    <Provider value={context}>
      <div className='notification-wrapper'>
        <ul>
          {messages.map(message => (
            <Notification
              key={message.id}
              message={message}
              onClose={removeMessage}
            />
          ))}
        </ul>
        {props.children}    
      </div>
    </Provider>
  )
}

function Notification({message, onClose}) {
  return (
    <li>
      {message.text}
      <button className='close' onClick={() => onClose(message)}>&times;</button>
    </li>
  )
}

export { NotificationProvider, NotificationContext }