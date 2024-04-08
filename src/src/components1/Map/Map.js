import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import mapStyles from '../../mapStyles';
import useStyles from './styles.js';
import Place from './Place';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  useEffect(() => {
    console.log('Places:', places);
  }, [places]);

  const handleMapChange = (e) => {
    setCoords({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const handleMarkerClick = (child) => {
    setChildClicked(places[child]);
  };

  console.log('Rendering Map component');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={handleMapChange}
        onChildClick={handleMarkerClick}
      >
        {places?.map((el, i) => (
            <Place
              key={i}
              lat={el.latitude ? el.latitude : 0}
              lng={el.longitude ? el.longitude : 0}
              el={el}
            />
        ))
        }
      </GoogleMapReact>
    </div>
  );
};

export default Map;