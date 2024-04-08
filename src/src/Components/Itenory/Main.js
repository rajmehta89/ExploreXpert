import React, { useEffect, useState } from "react";
import Maps from "../ItenoryMap/Map";
import Items from './ItonoryCreation';
import { Tag } from 'antd';
import './Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function App() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [customPlaces, setCustomPlaces] = useState([]);
  const [suggestionList, setSuggestionList] = useState(customPlaces);
  const [places, setPlaces] = useState([]);
  const [flattenedData, setFlattenedData] = useState([]);
  const [coords, setCoords] = useState({});
  const [cityName, setCityName] = useState("");
  const [lat,setLat]=useState('');
  const [map, setMap] = useState(null);
  const [lng,setlng]=useState('');

  // useEffect(() => {
  //   const storedData = localStorage.getItem('placeData');
  //   const parsedData = JSON.parse(storedData);
  //   if (parsedData && parsedData.display_name) {
  //     const city = parsedData.address.city; // Assuming the city name is under the 'city' key in the 'address' object
  //     setCityName(city);
  //   }
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem("token");
        const loc=localStorage.getItem("selectedItem");
        setLat(loc.lat);
        setlng(loc.lng);
        // Headers containing the JWT token for authentication
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        console.log(lat,lng);
        // Make GET request to the backend route to fetch selected item with token in headers
        const response = await axios.get('http://localhost:3001/user/api/getSelectedFavPlaces', { headers });
        const data=response.data.data;
        // Update state with fetched selected item
        if (response.status === 200) {
           // setSelectedItem(response.data.data);
            // Assuming the data property contains the user data
            console.log(data);
            console.log(data.favPlaces);
            setPlaces(data.favPlaces);

            const cityName = data.selectedItems[0].address?.city || data.selectedItems[0].name; // Fetch city or name
            setCityName(cityName);
            console.log('done');
        } else {
            console.error('Failed to fetch user data:', response.data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };

    fetchData(); // Call the async function immediately

    // Retrieve places from localStorage and set them to state
    //const places = localStorage.getItem('myplaces');
    //const retrivedplaces = JSON.parse(places);
    // setPlaces(retrivedplaces);
  }, []); // Empty dependency array for running once on component mount


  useEffect(() => {
    const storedData = localStorage.getItem('selectedItem');
    console.log("Stored data:", storedData); // Log the retrieved data
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      const cityName = parsedData.address?.city || parsedData.name; // Fetch city or name
      setCityName(cityName);
    }
  }, []);
  
  useEffect(() => {
    const newArray = places.map(item => ({
      city: item.address_obj?.city,
      county: item?.address_obj?.country,
      state: item?.address_obj?.state,
      display_name: `${item?.name},${item?.address}`,
      lat: item?.latitude,
      lon: item?.longitude,
      place_id: item?.location_id,
      place_rank: item?.ranking,
      type: item.category.name,
    }));

    setFlattenedData(newArray);
  }, [places]);

  useEffect(() => {
    setCustomPlaces(flattenedData);
    setSuggestionList(flattenedData);
  }, [flattenedData]);

  const handleSelectPlace = (selectedPlace) => {
    setSelectedPlaces([...selectedPlaces, selectedPlace]);
    setSuggestionList(suggestionList.filter(place => place.place_id !== selectedPlace.place_id));
  };

  const handleRemovePlace = (removedPlace) => {
    setSelectedPlaces(selectedPlaces.filter(place => place.place_id !== removedPlace.place_id));
    setSuggestionList([...suggestionList, removedPlace]);
  };


  return (

    <Container fluid style={{ height: '100vh'}} className="main-container-page5">
      <Row style={{ height: '100%'}} >
        <Col xs={6} style={{ maxHeight: '100vh', overflowY: 'auto' }} className="left-side-page5">
          <div className="upper-container-page5">
            <div className="upper-container-placeinfo-page5" style={{fontSize:'10vw',marginLeft:'0vw'}}>
              <p style={{color:'white'}}>{cityName}</p>
            </div>
          </div>
          <div className="down-container-page5">
            <Items
              selectedPlaces={selectedPlaces}
              suggestionList={suggestionList}
              onSelectPlace={handleSelectPlace}
              setSelectedPlaces={setSelectedPlaces}
              setSuggestionList={setSuggestionList}
              customPlaces={customPlaces}
            />
          </div>
        </Col>
        <Col xs={6} style={{ height: '100%', overflow: 'hidden', }} className="map-container-page5">
          <Maps places={selectedPlaces} 
              lat={lat}
              lng={lng}
               map={map}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;