import React, { useContext, /*  useReducer, useCallback */ } from 'react';

// import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

// import initialState from './initialState';
import { GrudgeContext } from './GrudgeContext';

// const ADD_GRUDGE = 'ADD_GRUDGE'
// const TOGGLE_FORGIVE = 'TOGGLE_FORGIVE'

const Application = () => {
  // const [grudges, dispatch] = useReducer(reducer, initialState)
  // /* 
  //  * Additional advantages of using useReducer instead of useState besides handling
  //  * more complex set of state changes:
  //  * 
  //  *  1. The dispatch function doesn't change between re-renders of the comnponent, meaning that its usage down in component tree won't produce unnecessary re-renders on consuming components
  //  *  2. State changes are abstracted away from the component; when dispatch is used, state changes are described by the action object and the actual state modification is handled by the reducer. The action object doesnt rely in the current state to describe state changes, in constrast with the updater function used with useState, which generally does depends on current state. This fact allows us to memoize (perform optimizations) the callback created to handle the state change description (remember that dispatch function is the same between re-renders).
  //  */
  // const addGrudge = grudge => {
  //   const newGrudge = {
  //     type: ADD_GRUDGE,
  //     payload: {
  //       ...grudge,
  //       forgiven: false,
  //       id: id(),
  //     },
  //   };
  //   dispatch(newGrudge)
  // };

  // const toggleForgiveness = useCallback(id => {
  //   dispatch({
  //     type: TOGGLE_FORGIVE,
  //     payload: { id }
  //   });
  // }, [dispatch]);
  const { undo, redo, isPast, isFuture } = useContext(GrudgeContext)

  console.log('app rendering')
  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button disabled={!isPast} onClick={undo}>Undo</button>
        <button disabled={!isFuture} onClick={redo}>Redo</button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;

/* function reducer(state, action) {
  switch(action.type) {
    case ADD_GRUDGE:
      return [
        action.payload,
        ...state
      ];
    case TOGGLE_FORGIVE:
      return state.map(i => {
        if(i.id === action.payload.id) return ({ ...i, forgiven: !i['forgiven']});
        return i
      });
    default:
      return state
  }
} */