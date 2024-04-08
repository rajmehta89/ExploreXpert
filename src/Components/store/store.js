
// Define reducer function
// store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  user: [
    // initial user properties
  ],
  // other state properties
};

// Define reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAV_PLACES':
      return {
        ...state,
        user: action.payload,
      };

    // Handle other actions as needed
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(rootReducer);

export default store;


