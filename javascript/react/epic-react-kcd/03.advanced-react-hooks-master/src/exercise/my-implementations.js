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

ReactDOM.render(<App />, document.getElementById('root'))