import React from 'react'
import ReactDOM from 'react-dom'
import '../styles.css'

/* 
import {
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  fetchPokemon,
  PokemonErrorBoundary
} from '../pokemon'
*/

/**
* 
* 
* Exercise 01. useReducer: simple Counter
* 
* 
*/

// function countReducer(state, action) {

//   // Extra credit #3 
//   // console.log(typeof action);

//   // const newState = typeof action === 'function'
//   // ? action(state)
//   // : action

//   // return {
//   //   ...state,
//   //   ...newState
//   // } 

//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         ...state,
//         count: state.count + action.payload
//       }
//     default:
//       return state
//   }

// }

// function Counter({ initialCount = 0, step = 1 }) {

//   // Extra credit #3 
//   // const [state, setState] = React.useReducer(countReducer, {
//   //   count: initialCount,
//   // })
//   // const { count } = state
//   // const increment = () => setState(currentState => ({ count: currentState.count + step }))

//   const [state, dispatch] = React.useReducer(countReducer, {
//     count: initialCount
//   })

//   const { count } = state
//   const increment = () => dispatch({
//     type: 'INCREMENT',
//     payload: step
//   })

//   return <button onClick={increment}>{count}</button>
// }

// export default function App() {
//   return <Counter step={2} />
// }

/**
 * 
 * 
 * Exercise 02. useCallback: custom hooks
 * 
 * 
 */

// function asyncReducer(state, action) {
//   switch (action.type) {
//     case 'pending': {
//       return { status: 'pending', data: null, error: null }
//     }
//     case 'resolved': {
//       return { status: 'resolved', data: action.data, error: null }
//     }
//     case 'rejected': {
//       return { status: 'rejected', data: null, error: action.error }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function useSafeDispatch(dispatch) {
//   const isMounted = React.useRef(false)

//   // KCD actually uses React.useLayoutEffect instead
//   React.useEffect(() => {
//     isMounted.current = true

//     return () => isMounted.current = false
//   }, [])

//   return React.useCallback((...args) => isMounted.current
//     ? dispatch(...args)
//     : (console.log("unmounted"), void 0),
//     [dispatch])
// }

// function useAsync(initialState) {
//   const [state, unSafeDispatch] = React.useReducer(asyncReducer, {
//     status: 'idle',
//     data: null,
//     error: null,
//     ...initialState,
//   })

//   const dispatch = useSafeDispatch(unSafeDispatch)

//   const { data, error, status } = state

//   const run = React.useCallback(promise => {
//     dispatch({ type: 'pending' })
//     promise.then(
//       data => {
//         dispatch({ type: 'resolved', data })
//       },
//       error => {
//         dispatch({ type: 'rejected', error })
//       },
//     )
//   }, [dispatch])

//   return {
//     error,
//     status,
//     data,
//     run,
//   }
// }

// function PokemonInfo({ pokemonName }) {
//   const { data: pokemon, status, error, run } = useAsync(
//     { status: pokemonName ? 'pending' : 'idle' },
//   )

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     run(fetchPokemon(pokemonName))
//   }, [pokemonName, run])

//   if (status === 'idle') {
//     return <>'Submit a pokemon'</>
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     throw error
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   function handleReset() {
//     setPokemonName('')
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </PokemonErrorBoundary>
//       </div>
//     </div>
//   )
// }

/**
 *
 *
 * Exercise 03. useContext: simple Counter
 *
 *
 */

// const CountContext = React.createContext(null)

// function CountProvider({ children, ...props }) {
//   const [count, setCount] = React.useState(0)

//   const value = [count, setCount]

//   return (
//     <CountContext.Provider value={value} {...props}>
//       {children}
//     </CountContext.Provider>
//   )
// }

// function useCount(ctx) {
//   const [...contextValue] = React.useContext(ctx)

//   if (!contextValue) {
//     throw new Error("Make sure to be within a contextful React tree")
//   }

//   return contextValue
// }

// function CountDisplay() {
//   const [count] = useCount(CountContext)

//   return <div>{`The current count is ${count}`}</div>
// }

// function Counter() {
//   const [_, setCount] = useCount(CountContext)

//   const increment = () => setCount(c => c + 1)
//   return <button onClick={increment}>Increment count</button>
// }

// export default function App() {
//   return (
//     <div>
//       <CountProvider>
//         <CountDisplay />
//         <Counter />
//       </CountProvider>
//     </div>
//   )
// }

/**
 *
 *
 * Exercise 03-extra-2. useContext: caching response data in context
 *
 *
 */

// import { useAsync } from '../utils'

// function pokemonCacheReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_POKEMON': {
//       return { ...state, [action.pokemonName]: action.pokemonData }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// const PokemonCacheContext = React.createContext(null)

// function PokemonCacheProvider({ children, ...props }) {
//   const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})

//   const value = [cache, dispatch]

//   return (
//     <PokemonCacheContext.Provider value={value} {...props}>
//       {children}
//     </PokemonCacheContext.Provider>
//   )
// }

// function PokemonInfo({ pokemonName }) {
//   const [cache, dispatch] = React.useContext(PokemonCacheContext)

//   const { data: pokemon, status, error, run, setData } = useAsync()

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     } else if (cache[pokemonName]) {
//       setData(cache[pokemonName])
//     } else {
//       run(
//         fetchPokemon(pokemonName).then(pokemonData => {
//           dispatch({ type: 'ADD_POKEMON', pokemonName, pokemonData })
//           return pokemonData
//         })
//       )
//     }
//   }, [cache, pokemonName, run, setData])

//   if (status === 'idle') {
//     return <>'Submit a pokemon'</>
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     throw error
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }
// }

// function PreviousPokemon({ onSelect }) {
//   const [cache] = React.useContext(PokemonCacheContext)

//   return (
//     <div>
//       Previous Pokemon
//       <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
//         {Object.keys(cache).map(pokemonName => (
//           <li key={pokemonName} style={{ margin: '4px auto' }}>
//             <button
//               style={{ width: '100%' }}
//               onClick={() => onSelect(pokemonName)}
//             >
//               {pokemonName}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// function PokemonSection({ onSelect, pokemonName }) {
//   return (
//     <PokemonCacheProvider>
//       <div style={{ display: 'flex' }}>
//         <PreviousPokemon onSelect={onSelect} />
//         <div className="pokemon-info" style={{ marginLeft: 10 }}>
//           <PokemonErrorBoundary
//             onReset={() => onSelect('')}
//             resetKeys={[pokemonName]}
//           >
//             <PokemonInfo pokemonName={pokemonName} />
//           </PokemonErrorBoundary>
//         </div>
//       </div>
//     </PokemonCacheProvider>
//   )
// }

// export default function App() {
//   const [pokemonName, setPokemonName] = React.useState(null)

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   function handleSelect(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
//     </div>
//   )
// }

/**
 * 
 * 
 * Exercise 04. useLayoutEffect: auto-growing textarea
 * 
 *
 */

/**
 *
 * Case 0:
 *    MessagesDisplay: useEffect
 *    SlooooowSibling: useEffect
 *
 * This is the base case, the change in the scrolling position on the messages list from the MessagesDisplay component is perceived by the user because the calculation/adjustment is performed after React renders the virtual DOM and the browser paints it on the screen. We need to consider that the delay noticed is purposedly created by the effect computation in the SlooooowSibling component. Remember that effects are run in order of appearance and synchronously.
 * 
 * 
 * Case 1:
 *    MessagesDisplay: useLayoutEffect
 *    SlooooowSibling: useEffect
 * 
 * In this case, the scrolling adjustment is not perceived by the user (better user experience!) when a new message is added and overflows the messages list container. This happens because the effect performing the adjustment is occurring in a useLayoutEffect hook, which happens after React render the virtual DOM BUT BEFORE the browser actually paints the user screen. Is important to point out that the delay is going to exist anyway, however, it is perceived when clicking the add/remove message button multiple times and after the first message add/remove action.
 * 
 * Case 2:
 *    MessagesDisplay: useLayoutEffect
 *    SlooooowSibling: useLayoutEffect
 *
 * The repainting of the screen with any added/removed messages along with the scrolling adjustment (if needed) is going to be delayed due to the running of the SlooooowSibling effect callback (LayoutEffect).
 * 
 * */

// function MessagesDisplay({ messages }) {
//   const containerRef: { current: HTMLDivElement } = React.useRef()
//   // 🐨 replace useEffect with useLayoutEffect
//   React.useLayoutEffect(() => {
//     containerRef.current.scrollTop = containerRef.current.scrollHeight
//   })

//   return (
//     <div ref={containerRef} role="log">
//       {messages.map((message, index, array) => (
//         <div key={message.id}>
//           <strong>{message.author}</strong>: <span>{message.content}</span>
//           {array.length - 1 === index ? null : <hr />}
//         </div>
//       ))}
//     </div>
//   )
// }

// // this is to simulate major computation/big rendering tree/etc.
// function sleep(time = 0) {
//   const wakeUpTime = Date.now() + time
//   while (Date.now() < wakeUpTime) { }
// }

// function SlooooowSibling() {
//   // try this with useLayoutEffect as well to see
//   // how it impacts interactivity of the page before updates.
//   React.useLayoutEffect(() => {
//     // increase this number to see a more stark difference
//     sleep(1500)
//   })
//   return null
// }

// export default function App() {
//   const [messages, setMessages] = React.useState(allMessages.slice(0, 8))
//   const addMessage = () =>
//     messages.length < allMessages.length
//       ? setMessages(allMessages.slice(0, messages.length + 1))
//       : null
//   const removeMessage = () =>
//     messages.length > 0
//       ? setMessages(allMessages.slice(0, messages.length - 1))
//       : null

//   return (
//     <div className="messaging-app">
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <button onClick={addMessage}>add message</button>
//         <button onClick={removeMessage}>remove message</button>
//       </div>
//       <hr />
//       <MessagesDisplay messages={messages} />
//       <SlooooowSibling />
//     </div>
//   )
// }

// const allMessages = [
//   `Leia: Aren't you a little short to be a stormtrooper?`,
//   `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
//   `Leia: You're who?`,
//   `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
//   `Leia: Ben Kenobi is here! Where is he?`,
//   `Luke: Come on!`,
//   `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
//   `Leia: Put that thing away! You're going to get us all killed.`,
//   `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
//   `Leia: It could be worse...`,
//   `Han: It's worse.`,
//   `Luke: There's something alive in here!`,
//   `Han: That's your imagination.`,
//   `Luke: Something just moves past my leg! Look! Did you see that?`,
//   `Han: What?`,
//   `Luke: Help!`,
//   `Han: Luke! Luke! Luke!`,
//   `Leia: Luke!`,
//   `Leia: Luke, Luke, grab a hold of this.`,
//   `Luke: Blast it, will you! My gun's jammed.`,
//   `Han: Where?`,
//   `Luke: Anywhere! Oh!!`,
//   `Han: Luke! Luke!`,
//   `Leia: Grab him!`,
//   `Leia: What happened?`,
//   `Luke: I don't know, it just let go of me and disappeared...`,
//   `Han: I've got a very bad feeling about this.`,
//   `Luke: The walls are moving!`,
//   `Leia: Don't just stand there. Try to brace it with something.`,
//   `Luke: Wait a minute!`,
//   `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
// ].map((m, i) => ({ id: i, author: m.split(': ')[0], content: m.split(': ')[1] }))

/**
 * 
 * 
 * Exercise 05. useImperativeHandle: scroll to top/bottom
 * 
 *
 */

// There are better ways to type the props on a component than using `typeof` (using an interface in this case would be preferable; with the interface we could type both props and allMessages array)
// const MessagesDisplay = React.forwardRef(
//   ({ messages }: React.PropsWithChildren<{ messages: typeof allMessages }>, ref) => {
//     const containerRef = React.useRef(null)

//     React.useLayoutEffect(() => {
//       scrollToBottom()
//     })

//     function scrollToTop() {
//       containerRef.current.scrollTop = 0
//     }
//     function scrollToBottom() {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight
//     }

//     React.useImperativeHandle(ref, () => ({
//       scrollToTop,
//       scrollToBottom
//     }))

//     return (
//       <div ref={containerRef} role="log">
//         {messages.map((message, index, array) => (
//           <div key={message.id}>
//             <strong>{message.author}</strong>: <span>{message.content}</span>
//             {array.length - 1 === index ? null : <hr />}
//           </div>
//         ))}
//       </div>
//     )
//   })

// export default function App() {
//   const listRef = React.useRef(null)
//   const [messages, setMessages] = React.useState(allMessages.slice(0, 8))
//   const addMessage = () =>
//     messages.length < allMessages.length
//       ? setMessages(allMessages.slice(0, messages.length + 1))
//       : null
//   const removeMessage = () =>
//     messages.length > 0
//       ? setMessages(allMessages.slice(0, messages.length - 1))
//       : null

//   function scrollToTop() {
//     listRef.current.scrollToTop()
//   }
//   function scrollToBottom() {
//     listRef.current.scrollToBottom()
//   }

//   return (
//     <div className="messaging-app">
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <button onClick={addMessage}>add message</button>
//         <button onClick={removeMessage}>remove message</button>
//       </div>
//       <hr />
//       <div>
//         <button onClick={scrollToTop}>Scroll to top</button>
//       </div>
//       <MessagesDisplay messages={messages} ref={listRef} />
//       <div>
//         <button onClick={scrollToBottom}>Scroll to bottom</button>
//       </div>
//     </div>
//   )
// }

// const allMessages = [
//   `Leia: Aren't you a little short to be a stormtrooper?`,
//   `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
//   `Leia: You're who?`,
//   `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
//   `Leia: Ben Kenobi is here! Where is he?`,
//   `Luke: Come on!`,
//   `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
//   `Leia: Put that thing away! You're going to get us all killed.`,
//   `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
//   `Leia: It could be worse...`,
//   `Han: It's worse.`,
//   `Luke: There's something alive in here!`,
//   `Han: That's your imagination.`,
//   `Luke: Something just moves past my leg! Look! Did you see that?`,
//   `Han: What?`,
//   `Luke: Help!`,
//   `Han: Luke! Luke! Luke!`,
//   `Leia: Luke!`,
//   `Leia: Luke, Luke, grab a hold of this.`,
//   `Luke: Blast it, will you! My gun's jammed.`,
//   `Han: Where?`,
//   `Luke: Anywhere! Oh!!`,
//   `Han: Luke! Luke!`,
//   `Leia: Grab him!`,
//   `Leia: What happened?`,
//   `Luke: I don't know, it just let go of me and disappeared...`,
//   `Han: I've got a very bad feeling about this.`,
//   `Luke: The walls are moving!`,
//   `Leia: Don't just stand there. Try to brace it with something.`,
//   `Luke: Wait a minute!`,
//   `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
// ].map((m, i) => ({ id: i, author: m.split(': ')[0], content: m.split(': ')[1] }))

/**
 * 
 * 
 * Exercise 06. useDebugValue: useMedia
 * 
 *
 */

// function useMedia(query, initialState = false) {
//   const [state, setState] = React.useState(initialState)
//   // 🐨 call React.useDebugValue here.
//   // 💰 here's the formatted label I use: `\`${query}\` => ${state}`
//   React.useDebugValue(`\`${query}\` => ${state}`)
//   // Backticks (`) are needed to allow both passing a string and also enable interpolation inside it.

//   React.useEffect(() => {
//     let mounted = true
//     const mql = window.matchMedia(query)
//     function onChange() {
//       if (!mounted) {
//         return
//       }
//       setState(mql.matches)
//     }

//     mql.addListener(onChange)
//     setState(mql.matches)

//     return () => {
//       mounted = false
//       mql.removeListener(onChange)
//     }
//   }, [query])

//   return state
// }

// function Box() {
//   const isBig = useMedia('(min-width: 1000px)')
//   const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
//   const isSmall = useMedia('(max-width: 699px)')
//   const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

//   return <div style={{ width: 200, height: 200, backgroundColor: color }} />
// }

// export default function App() {
//   return <Box />
// }

ReactDOM.render(<App />, document.getElementById('root'))