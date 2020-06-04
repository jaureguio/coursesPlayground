import React, { useReducer, createContext, useCallback } from 'react'

import initialState from './initialState'
import id from 'uuid/v4'

const GrudgeContext = createContext();

const ADD_GRUDGE = "ADD_GRUDGE";
const TOGGLE_FORGIVE = "TOGGLE_FORGIVE";
const UNDO = "UNDO";
const REDO = "REDO";

function GrudgeProvider({ children }) {
  const [state, dispatch] = useUndoReducer(reducer, initialState);
  const { present: grudges, past, future } = state
  const isPast = Boolean(past.length)
  const isFuture = Boolean(future.length)

  const addGrudge = useCallback((grudge) => {
    const newGrudge = {
      type: ADD_GRUDGE,
      payload: {
        ...grudge,
        forgiven: false,
        id: id(),
      },
    };
    dispatch(newGrudge);
  }, [dispatch]);

  const toggleForgiveness = useCallback((id) => {
      dispatch({
        type: TOGGLE_FORGIVE,
        payload: { id },
      });
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch({
      type: UNDO
    })
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({
      type: REDO
    })
  }, [dispatch]);

  const context = { grudges, addGrudge, toggleForgiveness, undo, redo, isPast, isFuture };

  return (
    <GrudgeContext.Provider value={context}>
      {children}
    </GrudgeContext.Provider>
  )
}

export { GrudgeProvider, GrudgeContext }

/* Normal reducer to set present state (no timelines involved) */

function reducer(state, action) {
  if(action.type === ADD_GRUDGE) {
    return [action.payload, ...state];
  }
  if(action.type === TOGGLE_FORGIVE) {
    return state.map((i) => {
      if (i.id === action.payload.id) return { ...i, forgiven: !i["forgiven"] };
      return i;
    })
  }
  
  return state
}

/* UNDO-REDO REDUCER ABSTRACTION (useUndoReducer hook)
 * 
 * The idea is to define a wrapping undoReducer around the current reducer implemented
 * This way, the state returned by this latter reducer is going to be intercepted by the
 * undoReducer logic, which will consist in the addition of the timelines as needed.
 * 
 * The modified state returned by undoReducer is then fed into React's useReducer along
 * with an appropiate default state. The contents of this useReducer should then be 
 * exposed (returned) from the hook.
 * 
 */

function useUndoReducer(reducer, defaultState) {
  const undoState = {
    past: [],
    present: defaultState,
    future: []
  }

  function undoReducer(state, action) {
    const presentState = reducer(state.present, action)

    if (action.type === UNDO) {
      console.log('UNDO')
      const [newPresent, ...newPast] = state.past
      return {
        past: newPast,
        present: newPresent,
        future: [presentState, ...state.future]
      }
    }
    if (action.type === REDO) {
      console.log('REDO')
      const [newPresent, ...newFuture] = state.future
      return {
        past: [presentState, ...state.past],
        present: newPresent,
        future: newFuture
      }
    }

    return {
      past: [state.present, ...state.past],
      present: presentState,
      future: []
    }
  }

  return useReducer(undoReducer, undoState)
}