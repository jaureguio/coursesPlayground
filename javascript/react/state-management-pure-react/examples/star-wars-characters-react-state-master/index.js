import React, { useReducer,/* useEffect, useState */ } from "react";
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

// import dummyData from './dummy-data';
import endpoint from './endpoint';

import './styles.css';

const initialState = {
  result: [],
  fetching: false,
  loaded: false, // ????
  error: null,
}

const FETCHING = 'FETCHING'
const FETCHING_COMPLETED = 'FETCHING_COMPLETED'
const ERROR = 'ERROR'

const Application = () => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);
  const { result: { characters }, fetching, error } = state;

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          { fetching ? (
            <p>Loading...</p>
          ) : characters ? (
            <CharacterList characters={characters} />
            ) : error && <p>Something went wrong!</p>
          }
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);

function fetchReducer(state, action) {
  if (action.type === FETCHING) {
    return {
      ...state,
      fetching: true,
    }
  }
  if (action.type === FETCHING_COMPLETED) {
    return {
      ...state,
      fetching: false,
      loaded: true,
      result: action.payload.response
    }
  }
  if (action.type === ERROR) {
    return {
      ...state,
      fetching: false,
      loaded: true,
      error: action.payload.error
    }
  }

  return state;
}

function useThunkReducer (reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const enhacedDispatch = action => {
    console.log(action)

    if(typeof action === 'function') {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }
  
  return [state, enhacedDispatch]
}

function fetchCharacters(dispatch) {
  dispatch({ type: FETCHING})
  fetch(`${endpoint}/characters`)
    .then(r => r.json())
    .then(r => dispatch({
      type: FETCHING_COMPLETED,
      payload: { response: r }
    }))
}