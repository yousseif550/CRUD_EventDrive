import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  events: []
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeEvent = (id) => {
    dispatch({
      type: 'REMOVE_EVENT',
      payload: id
    })
  }

  const addEvent = (event) => {
    dispatch({
      type: 'ADD_EVENT',
      payload: event
    })
  }

  const editEvent = (event) => {
    dispatch({
      type: 'EDIT_EVENT',
      payload: event
    })
  }

  return (
    <GlobalContext.Provider value={{
      events: state.events,
      removeEvent,
      addEvent,
      editEvent
    }}>
      {children}
    </GlobalContext.Provider>
  )
}