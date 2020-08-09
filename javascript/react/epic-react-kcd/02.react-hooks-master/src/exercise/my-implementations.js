import React from 'react'
import ReactDOM from 'react-dom'
import '../styles.css'

/**
 *
 *
 * Exercise 01. useState: greeting
 *
 *
 */

/*
interface Props {
  initialName?: string
}

function Greeting({ initialName = '' }: Props): JSX.Element {
  const [name, setName] = React.useState(initialName)
  
  function handleChange(event) {
    setName(event.target.value ? event.target.value : initialName)
  }
  
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting  />
}
*/

/**
 *
 *
 * Exercise 02. useEffect: persistent state
 *
 *
 */

/*
interface Props {
  initialName?: string;
}

type UseLocalStorage = [string, (val: string) => void]

// How can we declare an interface for an array? (the following is not correct)
type SetState = (val: string) => void

interface UseLocal {
  [key: number]: string | SetState;
}

interface UseLocals extends Array<UseLocal> {} ??????


function useLocalStorageState(
  key: string, 
  defaultValue,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): UseLocalStorage {
  const [state, setState] = React.useState(() => {
    if(window.localStorage.getItem(key)) {
      return deserialize(window.localStorage.getItem(key)) 
    }
    return defaultValue === 'fumction'
    ? defaultValue()
    : defaultValue
  })

  const prevKeyRef = React.useRef<string>(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if(prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
    return () => {
      console.log("removed")
      window.localStorage.removeItem(prevKeyRef.current)
    }
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}: Props): JSX.Element {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form onSubmit={event => event.preventDefault()}>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}
*/

/**
 *
 *
 * Exercise 03.js
 *
 *
 */

/*
function Name(): JSX.Element {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
    </div>
  )
}

function FavoriteAnimal({ animal, onAnimalChange}): JSX.Element {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={(event) => onAnimalChange(event.target.value)}
      />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App(): JSX.Element {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal}  />
      <Display animal={animal} />
    </form>
  )
}
*/

/**
 *
 *
 * Exercise 04. Tic tac toe
 *
 *
 */

/*
function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }

    const squares = [...currentSquares]
    squares[square] = nextValue
    const newHistory = history.slice(0, currentStep + 1)
    setHistory([...newHistory, squares])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = history.map((_, step) => {
    const desc = step ? `Go to move #${step}` : `Go to game start`
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    if (window.localStorage.getItem(key)) {
      return deserialize(window.localStorage.getItem(key))
    }
    return defaultValue === 'fumction' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef < string > key

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
    return () => {
      window.localStorage.removeItem(prevKeyRef.current)
    }
  }, [key, state, serialize])

  return [state, setState]
}

function App() {
  return <Game />
} 
*/

/**
 *  Implementing it completely!
 */

/*
function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:step', 0)

  const currentSquares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if(winner || currentSquares[square]) return

    const newSquares = [...currentSquares]
    newSquares[square] = nextValue
    const newHistory = history.slice(0, currentStep + 1)
    setHistory([...newHistory, newSquares])
    setCurrentStep(newHistory.length)
  }

  const moves = history.map((_, step) => {
    const desc = step ? `Go to move #${step}`: `Go to game start`
    const isCurrentStep = step === currentStep

    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function calculateNextValue(squares) {
  const xQuantity = squares.filter(val => val === 'X').length
  const oQuantity = squares.filter(val => val === 'O').length
  return xQuantity === oQuantity 
  ? 'X'
  : 'O'
}

function calculateWinner(squares) {
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

 We cannot use winningCombinations.forEach() in this case because it will always traverse the entire 2D array even after finding a winning combination!

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a,b,c] = winningCombinations[i]
    if(
      squares[a] &&
      squares[a] === squares [b] &&
      squares[a] === squares [c]
    ) return squares[a]
  }

  return null
}

function calculateStatus(winner, squares, nextValue) {
  return winner
  ? `Winner: ${winner}`
  : squares.every(Boolean)
  ? "Cat's Game, start another game"
  : `Next value: ${nextValue}`
}
*/

 /**
 * 
 * 
 * Exercise 05. userRef and useEffect: DOM Interaction
 * 
 * 
 */
/* 
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({ children }) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef(null)
  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  React.useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 1000,
      glare: true,
      'max-glare': 0.5,
    })
    return () => tiltNode.vanillaTilt.destroy()
  }, [])
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}
*/

/**
* 
* 
* Exercise 06. useEffect: HTTP Requests
* 
* 
*/

// import { ErrorBoundary } from 'react-error-boundary'
// import { PokemonForm, PokemonDataView, PokemonInfoFallback, fetchPokemon } from '../pokemon'
// 
// // class PokemonErrorBoundary extends React.Component {
// //   state = {
// //     error: null
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { error }
// //   }

// //   render() {
// //     const { error } = this.state
// //     if(error) {
// //       return <this.props.FallbackComponent error={error} />
// //     }
// //     return this.props.children
// //   }
// // }

// function PokemonInfo({ pokemonName }) {
//   const [state, setState] = React.useState({
//     status: "idle",
//     pokemon: null,
//     error: null
//   })

//   const { status, pokemon, error } = state

//   React.useEffect(() => {
//     if (!pokemonName) return
//     setState(state => ({ ...state, status: "pending" }))
//     fetchPokemon(pokemonName)
//       .then(pokemon => {
//         setState(state => ({
//           ...state,
//           status: "resolved",
//           pokemon
//         }))
//       })
//       .catch(error => {
//         setState(state => ({
//           ...state,
//           status: "rejected",
//           error
//         }))
//       })
//   }, [pokemonName])

//   if (status === 'idle') {
//     return <>'Submit a Pokemon'</>
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     throw error
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// }

// function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
//   return (
//     <div role="alert">
//       There was an error: {' '}
//       <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try Again!</button>
//     </div>
//   )
// }
// export default function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <ErrorBoundary
//           FallbackComponent={ErrorFallback}
//           onReset={() => setPokemonName('')}
//           resetKeys={[pokemonName]}
//         >
//           <PokemonInfo pokemonName={pokemonName} />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

ReactDOM.render(<App />, document.getElementById('root'))
