// src/components/HomePage.js
import React, { useState, useCallback } from 'react';
import './Location_fetch.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import videoSource from '../Assets/video1.mp4'; // Import your video file

var latitude = 0;
var longitude = 0;

const HomePage = ({ onCreateItinerary }) => {
  const [city, setCity] = useState(''); 
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [persons, setPersons] = useState('');
  const [budget, setBudget] = useState('');

  const getCurrentDate = useCallback(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${today.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  }, []);

  const handleStartDateChange = useCallback((newStartDate) => {
    setStartDate(newStartDate);
    document.getElementById('tripEndDate').min = newStartDate;
  }, []);

  const handleEndDateChange = useCallback((newEndDate) => {
    if (newEndDate < startDate) {
      alert('End date cannot be before the start date.');
      return;
    }
    setEndDate(newEndDate);
  }, [startDate]);

  const handleCreateItinerary = async () => {
    // Validate if required fields are filled
    if (!city || !country || !startDate || !endDate || !persons) {
      alert('Please fill in all required fields.');
      return;
    }

    
    // Create the itinerary logic
    const createdItinerary = {
      city,
      country,
      startDate,
      endDate,
      persons,
      budget,
    };

    // Pass the created itinerary to the parent componen
    try {
      const response = await axios.post('http://localhost:5001/api/location', { city, country });
      console.log('Backend Response:', response);
      latitude = response.data.locations[0].latitude;
      longitude = response.data.locations[0].longitude;
    } catch (error) {
      console.error('Error fetching details:', error.message);
      // setError('Error fetching details. Please try again.');
    }

    // Pass the created itinerary to the parent component
    onCreateItinerary(createdItinerary, city);
  };

  return (
    <div>
      <Header />
      <div className="video-background">
        <video autoPlay muted loop id="video-bg" className="video-bg">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="homepage-container">
          <div>
            <h2 style={{ textAlign: 'center', color: 'black' }}>Plan Your Next Adventure</h2>
            <div>
              <label htmlFor="whereTo" style={{ color: 'black' }}>Where do you want to go:</label>
              <input
                type="text"
                id="whereTo"
                placeholder="Enter destination"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label htmlFor="whichcountry" style={{ color: 'black' }}>Which country you want to go:</label>
              <input
                type="text"
                id="whereTo"
                placeholder="Enter destination"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <label htmlFor="tripStartDate" style={{ color: 'black' }}>
                Trip Start Date:
              </label>
              <input
                type="date"
                id="tripStartDate"
                value={startDate}
                min={getCurrentDate()} // Set the minimum date to the current date
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
              
              <label htmlFor="tripEndDate" style={{ color: 'black' }}>
                Trip End Date:
              </label>
              <input
                type="date"
                id="tripEndDate"
                value={endDate}
                min={startDate} // Set the minimum date to the selected start date
                onChange={(e) => handleEndDateChange(e.target.value)}
              />

              <label htmlFor="persons">Number of Persons:</label>
              <input
                type="number"
                id="persons"
                placeholder="Enter number of persons"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              />

            </div>
            <button onClick={handleCreateItinerary}>Create My Itinerary</button>
          </div>
        </div> 
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
export { latitude };
export { longitude };
