import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  // Provide default coordinates if coords is undefined
  const defaultCoords = coords || { lat: 56.0, lng: 45.0 };

  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={[defaultCoords.lat, defaultCoords.lng]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          // Check if coords is defined before setting the view
          if (coords) {
            map.setView([coords.lat, coords.lng], 14);
          }
        }}
        className={classes.leafletContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {places.length && places.map((place, i) => (
          <Marker
            key={i}
            position={[Number(place.latitude), Number(place.longitude)]}
            eventHandlers={{
              click: () => setChildClicked(place),
            }}
          >
            <Popup>
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
