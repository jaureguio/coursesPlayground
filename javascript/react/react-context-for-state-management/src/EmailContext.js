import React, { useState, useEffect, useContext, createContext } from 'react'
import { UserContext } from './UserContext'
import { NotificationContext } from './NotificationContext'
import { fetchEmails, fetchLatestEmails } from './api'

let EmailContext;
const { Provider, Consumer } = EmailContext = createContext()

function EmailProvider({ children }) {
  const [emails, setEmails] = useState([])
  const [status, setStatus] = useState('idle')
  const [currentEmail, setCurrentEmail] = useState(null)
  const { currentUser } = useContext(UserContext)
  const { notify } = useContext(NotificationContext)

  useEffect(() => {
    if(currentUser) { 
      setStatus('pending')
      fetchEmails()
        .then(emails => {
          setEmails([...emails])
          setStatus('resolved')
        })
      const fetchInterval = setInterval(() => refresh(), 2000)
      return () => {
        clearInterval(fetchInterval)
        setStatus('idle')
        setEmails([])
      }
    }
  }, [currentUser])

  const context = {
    emails,
    status,
    currentEmail,
    handleSelectEmail,
  }

  function handleSelectEmail(email) {
    setCurrentEmail(email)
  }

  function refresh() {
    if(status !== 'pending') {
      fetchLatestEmails()
        .then(newEmails => {
          // Should we make a shallow copy of newEmails before adding to emails?
          setEmails(emails => 
            // each newEmail's id is randomnized
            concat(emails,map(unary(partial(randomnizeProp, 'id')), newEmails))
          )
          notify(`${newEmails.length} new messages received!`)
        })
    }
  }

  return (
    <Provider value={context}>
      {children}
    </Provider>
  )
} 
export { EmailProvider, Consumer as EmailConsumer, Provider, EmailContext}

/* IMPLEMENTING SOME FUNCTIONAL PROGRAMMING PRINCIPLES JUST FOR FUN!!! */

function concat(arr, newArr) {
  return [...arr, ...newArr]
}

function map(mapperFn, arr) {
  /*
  Although imperative coding (loops, forEach method, etc.) and variable mutation (side-effects) go against the principles of FP, if we can ensure that all of it is going to be safele encapsulated, without affecting other parts of our code, we can consider implementing this approaches without worries.
  
  Here we are encapsulating both the loop (imperative code) and variable mutation (side-effect) within the bounds of the 'map' function definition 
  */

  const newArr = []

  for (let i = 0; i < arr.length; i++) {
    newArr.push(mapperFn(arr[i], i, arr))
  }
  return newArr;
}

// function compose(...fns) {
//   return function composed(result) {
//     for (let fn of fns) {
//       result = fn(result)
//     }
//     return result
//   }
// }

function partial(fn, ...initialArgs) {
  return function partialWrapper(...restArgs) {
    return fn(...initialArgs, ...restArgs)
  }
}

// function partialRight(fn, ...restArgs) {
//   return function partialRightWrapper(...firstArgs) {
//     const args = [...firstArgs, ...restArgs]
//     return fn(args.reverse)
//   }
// }

function unary(fn) {
  return function unaryWrapper(arg) {
    return fn(arg)
  }

  /*  Arrow (lambda) function version
    const unary = 
              fn =>
                arg =>
                  fn(arg)
  */
}

function randomnizeProp(prop, obj) {
  return { ...obj, [prop]: Math.random() }
}