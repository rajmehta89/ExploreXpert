import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import './DynamicList.css';


const DynamicListComponent = ({ items, setItems ,selectedPlaces, suggestionList, onSelectPlace,setSelectedPlaces, setSuggestionList, customPlaces}) => {

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newPlace, setNewPlace] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState('00:00');
  const [selectedEndTime, setSelectedEndTime] = useState('00:00');


  const handleDeleteCard = (index, item) => {
    setItinerary((prevItinerary) =>
      prevItinerary.filter((eachitem, i) => i !== index)
    );
   

    const matchingPlaces = customPlaces.filter(
      (place) => place.display_name === item.place
    );
    
    setSelectedPlaces((prevSelectedPlaces) =>
      prevSelectedPlaces.filter(
        (eachItem) => !matchingPlaces.some((match) => match.display_name === eachItem.display_name)
      )
    );
    
    setSuggestionList((prevSuggestionList) => [
      ...prevSuggestionList,
      ...matchingPlaces,
    ]);

    setTimeout(() => {
    }, 1500);
   

    console.log(itinerary);
    setSelectedItemIndex(null);
  };
  
  const handleSaveItenory = () => {

    setItinerary((prevItinerary) => [
      ...prevItinerary,
      {
        place: newPlace,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      },
    ]);

    setNewPlace('');
  };
  const handleWholeSaveItenory = () => {
    console.log(itinerary);
  
    // Use the callback function with setItems to ensure the latest state
    setItems(itinerary);
  
    // Reset other state variables
    setSelectedEndTime('00:00');
    setSelectedStartTime('00:00');
    setSelectedItemIndex(null);
  };
  

  const handleTimeChange = (selectedItemIndex) => {
    if (selectedItemIndex !== null) {
      setItinerary((prevItinerary) =>
        prevItinerary.map((eachitem, i) => ({
          ...eachitem,
          startTime: selectedItemIndex === i ? selectedStartTime : eachitem.startTime,
          endTime: selectedItemIndex === i ? selectedEndTime : eachitem.endTime,
        }))
      );
      setSelectedEndTime('00:00');
      setSelectedStartTime('00:00');
      setSelectedItemIndex(null);
    }
  };

  const handleSelectPlace = (selectedPlace) => {
     onSelectPlace(selectedPlace);
  };

  return (
    <div>
      {Array.isArray(itinerary) && itinerary.length > 0 ? (
        itinerary.map((item, index) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '28vh',borderRadius:'15px' }}>
          <Card key={index} style={{ width: '25rem', margin: '10px',backgroundColor:'#40A2E3',color:'#F1FADA',borderRadius:'15px'}}>
            <Card.Body>
              <Card.Title  style={{ fontSize: '16px' }}>{item.place ? item.place : 'No Place'}</Card.Title>
              <Card.Text>
                {selectedItemIndex === index ? (
                  <div>You are currently editing the time</div>
                ) : (
                  <div>
                    {item.startTime && item.endTime ? (
                      <p>
                        Start Time: {item.startTime} | End Time: {item.endTime}
                      </p>
                    ) : (
                      <div>You haven't selected any time</div>
                    )}
                  </div>
                )}
                
              </Card.Text>

              <Button
                style={{backgroundColor:'white', marginRight:'10px',color:"black"}}
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
              >
                Set Time
              </Button>

              <Button variant='danger' onClick={() => handleDeleteCard(index,item)}>
                Delete Item
              </Button>
            </Card.Body>
          </Card>
          <FontAwesomeIcon icon={faLocationDot} />
          </div>
        ))
      ) : (
        <div className='iteminfo'>No items available</div>
      )}

      {/* Time Picker Dialog */}
      {selectedItemIndex !== null && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' ,borderRadius:'15px',margin:'30px'}}>
        <div style={{ width: '25rem',backgroundColor:'#40A2E3',color:'#40A2E3',borderRadius:'15px',marginBottom:"30px"}}>
          <h6 style={{fontSize:"16px",color:"white",marginBottom:"10px",margin:"10px"}}><span style={{color:'red'}}>Set Time for </span><br/>{itinerary[selectedItemIndex].place}</h6>
          <div style={{color:'#F1FADA'}}>
          <div>
            <label>Start Time: </label>
            <input
              type='time'
              value={selectedStartTime}
              style={{borderRadius:'5px'}}
              onChange={(e) => setSelectedStartTime(e.target.value)}
            />
          </div>
          <div>
            <label style={{marginRight:'4px'}}>End Time :</label>
            <input
              type='time'
              value={selectedEndTime}
              style={{borderRadius:'5px'}}
              onChange={(e) => setSelectedEndTime(e.target.value)}
            />
          </div>
          <div>
          <Button  style={{backgroundColor:'white', marginTop:'7px',display:'flex',justifyContent:'flex-start',alignContent:'flex-start',marginLeft:'150px',marginBottom:'10px',color:'black'}} onClick={() => handleTimeChange(selectedItemIndex)}>
            Save Time
          </Button>
          </div>
        </div>

        </div>
        </div>
      )}

      

    {/*  <input
        type='text'
        placeholder='Add a Place'
        value={newPlace || ''}
        onChange={(e) => setNewPlace(e.target.value)}
        style={{
          padding: '10px',
          margin: '5px',
          fontSize: '16px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
    />  */}

    <SearchBox   selectedPlaces={selectedPlaces}
    suggestionList={suggestionList}
    onSelectPlace={handleSelectPlace}
    setNewPlace={setNewPlace}
    newPlace={newPlace}
    />

     <Button
        onClick={handleSaveItenory}
        style={{
          cursor: 'pointer',
          color: 'white',
          padding: '10px 12px',
          borderRadius: '4px',
          marginLeft: '10px',
        }}
      >
        Set Place
    </Button>    


      <Button
        onClick={handleWholeSaveItenory}
        style={{
          cursor: 'pointer',
          color: 'white',
          padding: '10px 12px',
          borderRadius: '4px',
          marginLeft: '10px',
        }}
      >
        Make Day
      </Button>
    </div>
  );
};

export default DynamicListComponent;
