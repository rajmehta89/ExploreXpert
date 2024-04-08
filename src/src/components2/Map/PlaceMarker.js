import React from 'react';

const PlaceMarker = ({ name, rating, photo }) => (
  <div>
    <img src={photo} alt={name} />
    <div>{name}</div>
    <div>Rating: {rating}</div>
  </div>
);

export default PlaceMarker;
