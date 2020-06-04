import React, { useReducer, createContext, useCallback } from 'react'

import initialState from './initialState'
import id from 'uuid/v4'

const GrudgeContext = createContext();

const ADD_GRUDGE = "ADD_GRUDGE";
const TOGGLE_FORGIVE = "TOGGLE_FORGIVE";

function GrudgeProvider({ children }) {
  const [grudges, dispatch] = useReducer(reducer, initialState);

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

  const context = { grudges, addGrudge, toggleForgiveness };

  return (
    <GrudgeContext.Provider value={context}>
      {children}
    </GrudgeContext.Provider>
  )
}

export { GrudgeProvider, GrudgeContext }

function reducer(state, action) {
  switch (action.type) {
    case ADD_GRUDGE:
      return [action.payload, ...state];
    case TOGGLE_FORGIVE:
      return state.map((i) => {
        if (i.id === action.payload.id)
          return { ...i, forgiven: !i["forgiven"] };
        return i;
      });
    default:
      return state;
  }
}