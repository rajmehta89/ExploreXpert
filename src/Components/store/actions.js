// actions.js
export const setFavPlaces = (places) => {
  return {
    type: 'SET_FAV_PLACES',
    payload: places,
  };
};