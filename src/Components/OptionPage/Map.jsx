// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import {latitude,longitude} from '../Home/Location_fetch';
import 'leaflet/dist/leaflet.css';

function App(props) {
   const [response, setResponse] = useState([]);
   
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5005/api/getPlaces', {
        latitude,
        longitude,
      });

      // Extract relevant information from the Geoapify API response
      const places = response.data.features.map((place, index) => ({
        name: place.properties.name,
        // category: place.properties.categories.catering.restaurant,
        address: place.properties.formatted,
        coordinates: place.geometry.coordinates,
      }));

      // Set the structured information to the state for rendering
      setResponse(places);
    } catch (error) {
      console.error('Error:', error.message);
      setResponse([]);
    }
  };


  return (
    <div className="App">
      <main>
        <div className="map-container">
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {response.map((place) => (
              <Marker key={place.id} position={[place.coordinates[1], place.coordinates[0]]}>
                <Tooltip>
                  <div>
                    <strong>{place.name}</strong>
                    <p>{place.category}</p>
                    <p>{place.address}</p>
                  </div>
                </Tooltip>
                <Popup>
                  <div>
                    <strong>{place.name}</strong>
                    <p>{place.category}</p>
                    <p>{place.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
