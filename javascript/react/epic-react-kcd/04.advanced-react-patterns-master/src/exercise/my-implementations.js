import React from 'react';
import ReactDOM from 'react-dom';
import '../switch.styles.css';

import { Switch } from '../switch'

/**
 * 
 * 
 * Exercise 01. Context Module Functions
 * 
 *
 */

// import { dequal } from 'dequal'

// // ./context/user-context.js

// import * as userClient from '../user-client'
// import { useAuth } from '../auth-context'

// const UserContext = React.createContext(null)
// UserContext.displayName = 'UserContext'

// function userReducer(state, action) {
//   switch (action.type) {
//     case 'start update': {
//       return {
//         ...state,
//         user: { ...state.user, ...action.updates },
//         status: 'pending',
//         storedUser: state.user,
//       }
//     }
//     case 'finish update': {
//       return {
//         ...state,
//         user: action.updatedUser,
//         status: 'resolved',
//         storedUser: null,
//         error: null,
//       }
//     }
//     case 'fail update': {
//       return {
//         ...state,
//         status: 'rejected',
//         error: action.error,
//         user: state.storedUser,
//         storedUser: null,
//       }
//     }
//     case 'reset': {
//       return {
//         ...state,
//         status: null,
//         error: null,
//       }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function UserProvider({ children }) {
//   const { user } = useAuth()
//   const [state, dispatch] = React.useReducer(userReducer, {
//     status: null,
//     error: null,
//     storedUser: user,
//     user,
//   })
//   const value = [state, dispatch]
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }

// function useUser() {
//   const context = React.useContext(UserContext)
//   if (context === undefined) {
//     throw new Error(`useUser must be used within a UserProvider`)
//   }
//   return context
// }

// function updateUser(dispatch, user, updates) {
//   dispatch({ type: 'start update', updates })
//   userClient.updateUser(user, updates).then(
//     updatedUser => dispatch({ type: 'finish update', updatedUser }),
//     error => dispatch({ type: 'fail update', error }),
//   )
// }
// // export {UserProvider, useUserState}

// // src/screens/user-profile.js
// // import {UserProvider, useUserState} from './context/user-context'
// function UserSettings() {
//   const [{ user, status, error }, userDispatch] = useUser()

//   const isPending = status === 'pending'
//   const isRejected = status === 'rejected'

//   const [formState, setFormState] = React.useState(user)

//   const isChanged = !dequal(user, formState)

//   function handleChange(e) {
//     setFormState({ ...formState, [e.target.name]: e.target.value })
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     updateUser(userDispatch, user, formState)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div style={{ marginBottom: 12 }}>
//         <label style={{ display: 'block' }} htmlFor="username">
//           Username
//         </label>
//         <input
//           id="username"
//           name="username"
//           disabled
//           readOnly
//           value={formState.username}
//           style={{ width: '100%' }}
//         />
//       </div>
//       <div style={{ marginBottom: 12 }}>
//         <label style={{ display: 'block' }} htmlFor="tagline">
//           Tagline
//         </label>
//         <input
//           id="tagline"
//           name="tagline"
//           value={formState.tagline}
//           onChange={handleChange}
//           style={{ width: '100%' }}
//         />
//       </div>
//       <div style={{ marginBottom: 12 }}>
//         <label style={{ display: 'block' }} htmlFor="bio">
//           Biography
//         </label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={formState.bio}
//           onChange={handleChange}
//           style={{ width: '100%' }}
//         />
//       </div>
//       <div>
//         <button
//           type="button"
//           onClick={() => {
//             setFormState(user)
//             userDispatch({ type: 'reset' })
//           }}
//           disabled={!isChanged || isPending}
//         >
//           Reset
//         </button>
//         <button
//           type="submit"
//           disabled={(!isChanged && !isRejected) || isPending}
//         >
//           {isPending
//             ? '...'
//             : isRejected
//               ? '✖ Try again'
//               : isChanged
//                 ? 'Submit'
//                 : '✔'}
//         </button>
//         {isRejected ? <pre style={{ color: 'red' }}>{error.message}</pre> : null}
//       </div>
//     </form>
//   )
// }

// function UserDataDisplay() {
//   const [{ user }] = useUser()
//   return <pre>{JSON.stringify(user, null, 2)}</pre>
// }

// export default function App() {
//   return (
//     <div
//       style={{
//         height: 350,
//         width: 300,
//         backgroundColor: '#ddd',
//         borderRadius: 4,
//         padding: 10,
//         overflow: 'scroll',
//       }}
//     >
//       <UserProvider>
//         <UserSettings />
//         <UserDataDisplay />
//       </UserProvider>
//     </div>
//   )
// }

/**
 * 
 * 
 * Exercise 02. Compound Components
 * 
 *
 */

// // We could use "//ts-ignore" the line immediately above compile error where typescript complains about some type not handled accordingly

// function Toggle({ children }): any {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)

//   return React.Children.map(children, child => {
//     // React.createElement is passed a string as first argument when creating React objects for native DOM elements
//     // This way we can check which child is a native DOM and avoid passing props mistakenly
//     return typeof child.type === 'string'
//       ? child
//       : React.cloneElement(child, { on, toggle })
//   })
// }

// const ToggleOn = ({ on, children }: any) => on ? children : null

// const ToggleOff = ({ on, children }: any) => on ? null : children

// const ToggleButton = ({ on, toggle, ...props }: any) =>
//   <Switch on={on} onClick={toggle} {...props} />

// export default function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <span>Hello</span>
//         <ToggleButton />
//       </Toggle>
//     </div>
//   )
// }

/**
 * 
 * 
 * Exercise 03. Flexible Compound Components
 * 
 *
 */

// // 🐨 create your ToggleContext context here
// // 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// interface ContextValue {
//   on: boolean;
//   toggle(): void
// }
// const ToggleContext = React.createContext<ContextValue>(undefined)
// ToggleContext.displayName = 'ToggleContext'

// function useToggle() {
//   const context = React.useContext(ToggleContext)
//   if (context === undefined) {
//     throw new Error("useToggle must be used within a <Toggle />")
//   }
//   return context
// }
// function Toggle(props): any {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)

//   const value = { on, toggle }

//   return <ToggleContext.Provider value={value} {...props} />
// }

// function ToggleOn({ children }) {
//   const { on } = useToggle()
//   return on ? children : null
// }

// function ToggleOff({ children }) {
//   const { on } = useToggle()
//   return on ? null : children
// }

// // 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
// function ToggleButton(props) {
//   const { on, toggle } = useToggle()
//   return <Switch on={on} onClick={toggle} {...props} />
// }

// export default function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <div>
//           <ToggleButton />
//         </div>
//       </Toggle>
//     </div>
//   )
// }

/*
eslint
  no-unused-vars: "off",
*/

/**
 * 
 * 
 * Exercise 04. Prop Collections and Getters
 * 
 *
 */

// function callAll(...fns) {
//   return function gatherArguments(...args) {
//     fns.forEach(fn => fn?.(...args))
//   }
// }

// function useToggle() {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)

//   function getTogglerProps(implementations: any = {}) {
//     const { onClick: userOnClick, ...userImplementations } = implementations

//     return {
//       'aria-pressed': on,
//       onClick,
//       ...userImplementations
//     }
//   }
//   return { on, toggle, getTogglerProps }
// }

// export default function App() {
//   const { on, getTogglerProps } = useToggle()
//   return (
//     <div>
//       <Switch {...getTogglerProps({ on })} />
//       <hr />
//       <button
//         {...getTogglerProps({
//           'aria-label': 'custom-button',
//           onClick: () => console.log("onButtonClick"),
//           id: 'custom-button-id'
//         })}
//       >
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

/**
 * 
 * 
 * Exercise 05. State Reducer
 * 
 *
 */

// const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

// // Extra-credit 2
// const actionTypes = {
//   toggle: 'toggle',
//   reset: 'reset'
// }

// function toggleReducer(state, { type, initialState }) {
//   switch (type) {
//     case actionTypes.toggle: {
//       return { on: !state.on }
//     }
//     case actionTypes.reset: {
//       return initialState
//     }
//     default: {
//       throw new Error(`Unsupported type: ${type}`)
//     }
//   }
// }

// function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
//   const { current: initialState } = React.useRef({ on: initialOn })
//   // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
//   // provided as an option
//   // ... and that's it! Don't forget to check the 💯 extra credit!
//   const [state, dispatch] = React.useReducer(reducer, initialState)
//   const { on } = state

//   // @ts-ignore
//   const toggle = () => dispatch({ type: actionTypes.toggle })
//   const reset = () => dispatch({ type: actionTypes.reset, initialState })

//   function getTogglerProps({ onClick, ...props }: any = {}) {
//     return {
//       'aria-pressed': on,
//       onClick: callAll(onClick, toggle),
//       ...props,
//     }
//   }

//   function getResetterProps({ onClick, ...props }: any = {}) {
//     return {
//       onClick: callAll(onClick, reset),
//       ...props,
//     }
//   }

//   return {
//     on,
//     reset,
//     toggle,
//     getTogglerProps,
//     getResetterProps,
//   }
// }

// export default function App() {
//   const [timesClicked, setTimesClicked] = React.useState(0)
//   const clickedTooMuch = timesClicked >= 4

//   function toggleStateReducer(state, action) {
//     /*  switch (action.type) {
//         case actionTypes.toggle: {
//           if (clickedTooMuch) {
//             return { on: state.on }
//           }
//           return { on: !state.on }
//         }
//         case actionTypes.reset: {
//           return { on: false }
//         }
//         default: {
//           throw new Error(`Unsupported type: ${action.type}`)
//         }
//       }  */

//     // Extra-credit 1
//     if (action.type === actionTypes.toggle && timesClicked >= 4) {
//       return { on: state.on }
//     }
//     return toggleReducer(state, action)
//   }

//   const { on, getTogglerProps, getResetterProps } = useToggle({
//     reducer: toggleStateReducer,
//   })

//   return (
//     <div>
//       <Switch
//         {...getTogglerProps({
//           disabled: clickedTooMuch,
//           on: on,
//           onClick: () => setTimesClicked(count => count + 1),
//         })}
//       />
//       {clickedTooMuch ? (
//         <div data-testid="notice">
//           Whoa, you clicked too much!
//           <br />
//         </div>
//       ) : timesClicked > 0 ? (
//         <div data-testid="click-count">Click count: {timesClicked}</div>
//       ) : null}
//       <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
//         Reset
//       </button>
//     </div>
//   )
// }

/**
 * 
 * 
 * Exercise 06. Control Props
 * 
 *
 */

// const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

// const actionTypes = {
//   toggle: 'toggle',
//   reset: 'reset',
// }

// function toggleReducer(state, { type, initialState }) {
//   switch (type) {
//     case actionTypes.toggle: {
//       return { on: !state.on }
//     }
//     case actionTypes.reset: {
//       return initialState
//     }
//     default: {
//       throw new Error(`Unsupported type: ${type}`)
//     }
//   }
// }

// // interface props {
// //   onChange: any;
// //   reducer(state: any, action: any): any;
// // }

// // interface props2 extends props {
// //   initialOn: boolean;
// //   on: boolean;
// // }

// function useToggle({
//   initialOn = false,
//   reducer = toggleReducer,
//   // 🐨 add an `onChange` prop.
//   // 🐨 add an `on` option here
//   // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
//   onChange,
//   on: controlledOn,
//   readOnly = false
// }) {
//   const { current: initialState } = React.useRef({ on: initialOn })
//   const [state, dispatch] = React.useReducer(reducer, initialState)
//   // 🐨 determined whether on is controlled and assign that to `onIsControlled`
//   // 💰 `controlledOn != null`
//   const onIsControlled = controlledOn !== undefined

//   // 🐨 Replace the next line with assigning `on` to `controlledOn` if
//   // `onIsControlled`, otherwise, it should be `state.on`.
//   const on = onIsControlled ? controlledOn : state.on

//   // We want to call `onChange` any time we need to make a state change, but we
//   // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
//   // unnecessary renders).
//   // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
//   // right here. This will:
//   // 1. accept an action
//   // 2. if onIsControlled is false, call dispatch with that action
//   // 3. Then call `onChange` with our "suggested changes" and the action.
//   function dispatchWithOnChange(action) {
//     if (!onIsControlled) {
//       dispatch(action)
//     }
//     if (onChange) {
//       onChange(reducer({ ...state, on }, action), action)
//     }
//   }

//   // Extra credit 1
//   const hasOnChange = Boolean(onChange)
//   React.useEffect(() => {
//     if (onIsControlled && !hasOnChange && !readOnly) {
//       console.warn("Hey you should pass an `onChange` prop alongside the `on` prop when `readOnly` is set to `false`")
//     }
//   }, [hasOnChange, onIsControlled, readOnly])


//   // 🦉 "Suggested changes" refers to: the changes we would make if we were
//   // managing the state ourselves. This is similar to how a controlled <input />
//   // `onChange` callback works. When your handler is called, you get an event
//   // which has information about the value input that _would_ be set to if that
//   // state were managed internally.
//   // So how do we determine our suggested changes? What code do we have to
//   // calculate the changes based on the `action` we have here? That's right!
//   // The reducer! So if we pass it the current state and the action, then it
//   // should return these "suggested changes!"
//   //
//   // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
//   // `onChange(reducer({...state, on}, action), action)`
//   // 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
//   // so keep that in mind when you call it! How could you avoid calling it if it's not passed?

//   // make these call `dispatchWithOnChange` instead

//   // @ts-ignore
//   const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle })
//   const reset = () => dispatchWithOnChange({ type: actionTypes.reset, initialState })

//   // @ts-ignore
//   function getTogglerProps({ onClick, ...props } = {}) {
//     return {
//       'aria-pressed': on,
//       onClick: callAll(onClick, toggle),
//       ...props,
//     }
//   }

//   // @ts-ignore
//   function getResetterProps({ onClick, ...props } = {}) {
//     return {
//       onClick: callAll(onClick, reset),
//       ...props,
//     }
//   }

//   return {
//     on,
//     reset,
//     toggle,
//     getTogglerProps,
//     getResetterProps,
//   }
// }

// export function Toggle({ on: controlledOn, onChange }) {
//   const { on, getTogglerProps } = useToggle({ on: controlledOn, onChange })
//   // @ts-ignore
//   const props = getTogglerProps({ on })
//   return <Switch {...props} />
// }

// export default function App() {
//   const [bothOn, setBothOn] = React.useState(false)
//   const [timesClicked, setTimesClicked] = React.useState(0)

//   function handleToggleChange(state, action) {
//     if (action.type === actionTypes.toggle && timesClicked > 4) {
//       return
//     }
//     setBothOn(state.on)
//     setTimesClicked(c => c + 1)
//   }

//   function handleResetClick() {
//     setBothOn(false)
//     setTimesClicked(0)
//   }

//   return (
//     <div>
//       <div>
//         <Toggle on={bothOn} onChange={handleToggleChange} />
//         <Toggle on={bothOn} onChange={handleToggleChange} />
//       </div>
//       {timesClicked > 4 ? (
//         <div data-testid="notice">
//           Whoa, you clicked too much!
//           <br />
//         </div>
//       ) : (
//           <div data-testid="click-count">Click count: {timesClicked}</div>
//         )}
//       <button onClick={handleResetClick}>Reset</button>
//       <hr />
//       <div>
//         <div>Uncontrolled Toggle:</div>
//         {/* @ts-ignore */}
//         <Toggle
//           onChange={(...args) =>
//             console.info('Uncontrolled Toggle onChange', ...args)
//           }
//         />
//       </div>
//     </div>
//   )
// }


if (process.env.NODE_ENV !== "test") {
  ReactDOM.render(<App />, document.getElementById('root'))
}