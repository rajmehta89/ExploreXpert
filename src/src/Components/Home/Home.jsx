// src/App.js
import React, { useState } from 'react';
import HomePage from './Location_fetch.jsx';
import OptionsPage from '../OptionPage/Main_Container.jsx';
import './Home.css'

const Home = () => {
  const [itineraryCreated, setItineraryCreated] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]); // State to hold selected options

  const handleCreateItinerary = (createdItinerary, createdLocation) => {
    setItinerary(createdItinerary);
    setLocation(createdLocation);
    setItineraryCreated(true);
  };

  // Callback function to receive selectedOptions from OptionsPage
  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  return (
      <div >
        {itineraryCreated ? (
        <OptionsPage location={location} onSelectedOptionsChange={handleSelectedOptionsChange} />
      ) : (
        <HomePage onCreateItinerary={handleCreateItinerary} />
      )}
      </div>
  );
};

export default Home;

