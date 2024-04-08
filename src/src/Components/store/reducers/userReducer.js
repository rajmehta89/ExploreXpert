// src/store/reducers/userReducer.js

const initialState = {
    favplaces: [], // Initial state for favorite places
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FAV_PLACES':
        return {
          ...state,
          favplaces: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  