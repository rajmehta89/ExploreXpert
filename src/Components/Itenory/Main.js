import React, { useEffect, useState } from "react";

import Maps from "../ItenoryMap/Map";
import Items from './ItonoryCreation';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// const customPlaces = [
//   {
//     village: 'Surat',
//     municipality: 'Riom',
//     county: 'Puy-de-Dôme',
//     ISO3166_2_lvl6: 'FR-63',
//     state: 'Auvergne-Rhône-Alpes',
//     display_name: 'Surat, Riom, Puy-de-Dôme, Auvergne-Rhône-Alpes, Metropolitan France, 63720, France',
//     lat: '45.9383',
//     lon: '3.2553',
//     osm_id: 122691,
//     osm_type: 'relation',
//     place_id: 107151559,
//     place_rank: 16,
//     type: 'administrative',
//   },
//   {
//     village: 'Paris',
//     municipality: 'Paris',
//     county: 'Paris',
//     ISO3166_2_lvl6: 'FR-75',
//     state: 'Île-de-France',
//     display_name: 'Paris, Paris, Paris, Île-de-France, France',
//     lat: '48.8566',
//     lon: '2.3522',
//     osm_id: 10175190,
//     osm_type: 'relation',
//     place_id: 3750085,
//     place_rank: 8,
//     type: 'city',
//   },
//   {
//     village: 'Berlin',
//     municipality: 'Berlin',
//     county: 'Berlin',
//     ISO3166_2_lvl6: 'DE-BE',
//     state: 'Berlin',
//     display_name: 'Berlin, Berlin, Berlin, Germany',
//     lat: '52.5200',
//     lon: '13.4050',
//     osm_id: 62547,
//     osm_type: 'relation',
//     place_id: 62422,
//     place_rank: 8,
//     type: 'city',
//   },
//   // Add more places as needed
// ];


const travelData = [
  {
    day: 'Day 1',
    places: [
      { key: '1', place: 'Destination 1', startTime: '8:00 AM', endTime: '6:00 PM' },
      // Add more places for Day 1
    ],
  },
  {
    day: 'Day 2',
    places: [
      { key: '2', place: 'Destination 2', startTime: '9:00 AM', endTime: '7:00 PM' },
      // Add more places for Day 2
    ],
  },
  // Add more days as needed
];


function App() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [customPlaces,setCustomPlaces]=useState([]);

  const [suggestionList, setSuggestionList] = useState(customPlaces);
  const [places,setPlaces]=useState([]);
  const [flattenedData, setFlattenedData] = useState([]);
  const [coords,setCoords]=useState({});

  
  // useEffect(() => {
  //   const placeToGo = localStorage.getItem('selectedItem');
  //   const retrivedplaceToGo = JSON.parse(placeToGo);
  //   console.log(retrivedplaceToGo);
  //   console.log(`latitude`, retrivedplaceToGo.lat);
  //   console.log(`longitude`, retrivedplaceToGo.lon);
  
  //   // Parse strings to numbers before setting the coordinates
  //   const latitude = parseFloat(retrivedplaceToGo.lat);
  //   const longitude = parseFloat(retrivedplaceToGo.lon);
  
  //   setCoords({ lat: latitude, lng: longitude });
  // }, []);
  

  // useEffect(() => {
  //   console.log('Coordinates set:', coords);
  //   // You can perform additional actions based on the updated coords here
  // }, [coords]);

  useEffect(()=>{
    const places=localStorage.getItem('myplaces');
    const retrivedplaces=JSON.parse(places);
    setPlaces(retrivedplaces);
    console.log(places);
  },[]);


  useEffect(()=>{
   
    const newArray=places.map(item=>({
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

  },[places]);

  useEffect(()=>{
    setCustomPlaces(flattenedData);
    setSuggestionList(flattenedData);

    console.log('finaldata:',flattenedData);
  },[flattenedData]);



  
  const handleSelectPlace = (selectedPlace) => {
    setSelectedPlaces([...selectedPlaces, selectedPlace]);
    setSuggestionList(suggestionList.filter(place => place.place_id !== selectedPlace.place_id));
  };

  const handleRemovePlace = (removedPlace) => {
    setSelectedPlaces(selectedPlaces.filter(place => place.place_id !== removedPlace.place_id));
    setSuggestionList([...suggestionList, removedPlace]);
  };



  return (

   <Container fluid style={{ height: '100vh' }}>
      <Row style={{ height: '100%' }}>
        <Col xs={6} style={{ height: '100%', overflow: 'auto' }}>
          <Items
            selectedPlaces={selectedPlaces}
            suggestionList={suggestionList}
            onSelectPlace={handleSelectPlace}
            setSelectedPlaces={setSelectedPlaces}
            setSuggestionList={setSuggestionList}
            customPlaces={customPlaces}    
          />
        </Col>
        <Col xs={6} style={{ height: '100%', overflow: 'auto' }}>
          <Maps places={selectedPlaces} />
        </Col>
      </Row> 

 
  </Container>  


  );
}

export default App;

