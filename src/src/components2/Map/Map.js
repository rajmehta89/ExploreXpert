import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import mapStyles from '../../mapStyles.js';
import useStyles from './styles.js';
import Place1 from '../Place/Place1.jsx';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log('Places:', places);
    console.log('type',typeof places);
  }, [places]);

  const handleMapChange = (e) => {
    console.log('Map Center Changed:', e.center);
    console.log('Map Bounds Changed:', e.marginBounds);
    setCoords({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const handleMarkerClick = (child) => {
    console.log('Marker Clicked:', child);
    setChildClicked(places[child]);
  };

  console.log('Rendering Map component');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'IzaSyBdYkJM0MQoa8lScK5bxfl1JuN5P1eDLlY' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={handleMapChange}
        onChildClick={handleMarkerClick}
      >
        {Object.keys(places).map((key) => {
          const el = places[key];
          console.log('Mapping Place:', el);
          return (
            <Place1
              key={key}
              lat={el.latitude ? el.latitude : 0}
              lng={el.longitude ? el.longitude : 0}
              el={el}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
