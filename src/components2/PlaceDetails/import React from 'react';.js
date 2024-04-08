import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  if (!places || !Array.isArray(places)) {
    console.error('Invalid places data:', places);
    return null;
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '6dfc0033d2mshe22bf53e1806888p1b956djsn811e85f90abc' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(places[child])}
      >
        {places.map((place) => {
          const position = {
            lat: Number(place.latitude),
            lng: Number(place.longitude),
          };

          if (isNaN(position.lat) || isNaN(position.lng)) {
            console.error(`Invalid coordinates for place ${place.name}`, position);
            return null;
          }

          return (
            <div
              className={classes.markerContainer}
              lat={position.lat}
              lng={position.lng}
              key={place.id} // Assuming you have a unique identifier like place.id
            >
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.example.com/placeholder.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          );
        })}

        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt="Weather icon" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
