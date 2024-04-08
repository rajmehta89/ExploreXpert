import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import placeholder from '../../Components/ItenoryMap/placeholder.png';

const CustomMarker = ({ place }) => (
  <Paper>
    <Typography variant="subtitle2" gutterBottom>
      {place.name}
    </Typography>
    <img
      src={place.photo ? place.photo.images.large.url : placeholder}
      alt={place.name}
    />
    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
  </Paper>
);

export default CustomMarker;

