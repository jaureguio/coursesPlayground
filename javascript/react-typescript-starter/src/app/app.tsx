import React from 'react';
import ReactDOM from 'react-dom';
import '../styles.css'

// const App: React.FC<{ compiler: string, framework: string }> = (props) => {
  //   return (
//     <div>
//       <div>{props.compiler}</div>
//       <div>{props.framework}</div>
//     </div>
//   );
// }

// ReactDOM.render(
  //   <App compiler="TypeScript" framework="React" />,
  //   document.getElementById("root")
  // );

/**
 *
 *
 * Exercise 01. Simple Data-fetching
 *
 *
 */

// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import { PokemonDataView, fetchPokemon } from '../pokemon'

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

// 🐨 create a variable called "pokemon" (using let)
let pokemon

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign the pokemonPromise variable to a call to fetchPokemon('pikachu')
const pokemonPromise = fetchPokemon('charizard')

// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))
pokemonPromise.then(pokemonData => pokemon = pokemonData) 

function PokemonInfo() {
  // 🐨 if there's no pokemon yet, then throw the pokemonPromise
  // 💰 (no, for real. Like: `throw pokemonPromise`)
  if(!pokemon) throw pokemonPromise

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

export default function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

if (process.env.NODE_ENV !== 'test') {
  // @ts-ignore
  ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />)
}