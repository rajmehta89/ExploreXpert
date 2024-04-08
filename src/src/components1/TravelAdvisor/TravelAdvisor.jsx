import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid ,Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { getPlacesData, getWeatherData } from '../../api/travelAdvisorAPI';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Header from '../../Components/Header/Header.jsx';
import List from '../List/List';
import Map from '../Map/Map';
import axios from 'axios';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);


  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate=useNavigate();

    useEffect(() => {
      // const placeToGo = localStorage.getItem('selectedItem');

      // const retrivedplaceToGo = JSON.parse(placeToGo);
      // console.log(retrivedplaceToGo);
      // console.log(`latitude`, retrivedplaceToGo.lat);
      // console.log(`longitude`, retrivedplaceToGo.lon);
    
      // // Parse strings to numbers before setting the coordinates

      const fetchData = async () => {
        try {
            // Get token from local storage
            const token = localStorage.getItem("token");
    
            // Headers containing the JWT token for authentication
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
    
            // Make GET request to the backend route to fetch selected item with token in headers
            const response = await axios.get('http://localhost:3001/user/api/getSelectedItem', { headers });
    
            // Update state with fetched selected item
            if (response.status === 200) {
                const data = response.data.data;
                console.log('User data fetched successfully:', data);
    
                // Check if selectedItems array exists and has elements
                if (data.selectedItems && data.selectedItems.length > 0) {
                    const latitude = parseFloat(data.selectedItems[0].lat);
                    const longitude = parseFloat(data.selectedItems[0].lon);
                    setCoords({ lat: latitude, lng: longitude });
                } else {
                    console.error('No selected items found in the response:', data);
                }
            } else {
                console.error('Failed to fetch user data:', response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

    fetchData();
  }, []); 
    
    

    useEffect(() => {
      console.log('Coordinates set:', coords);
      // You can perform additional actions based on the updated coords here
    }, [coords]);

     
  // const placeToGo=localStorage.getItem('selectedItem');
  // const retrivedplaceToGo=JSON.parse(placeToGo);
  // setCoords({ lat: retrivedplaceToGo.latitude, lng: retrivedplaceToGo.longitude });

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          console.log(places);
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const handleItenorySection=()=>{
     navigate("/Itenory");
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #161616, #2c3e50)',
    minHeight: '100vh'}}>
      <Header />
      <CssBaseline />
       <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Map
        setChildClicked={setChildClicked}
        setBounds={setBounds}
        setCoords={setCoords}
        coords={coords}
        places={filteredPlaces.length ? filteredPlaces : places}
      />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,width:'4vw'}}>
          <Button variant="contained" color="primary" onClick={handleItenorySection}>Create Itinerary</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;