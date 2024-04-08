import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Tooltip } from 'antd';
import SearchBox from './SearchBox';
import './DynamicList.css';
import { TimePicker } from 'antd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';
import {message} from 'antd';

const DynamicListComponent = ({ items, setItems, selectedPlaces, suggestionList, onSelectPlace, setSelectedPlaces, setSuggestionList, customPlaces }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newPlace, setNewPlace] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [show,setShow]=useState(true);

  const handleDeleteCard = (index, item) => {
    setItinerary(prevItinerary =>
      prevItinerary.filter((eachitem, i) => i !== index)
    );

    const matchingPlaces = customPlaces.filter(
      place => place.display_name === item.place
    );

    setSelectedPlaces(prevSelectedPlaces =>
      prevSelectedPlaces.filter(
        eachItem =>
          !matchingPlaces.some(
            match => match.display_name === eachItem.display_name
          )
      )
    );

    setSuggestionList(prevSuggestionList => [
      ...prevSuggestionList,
      ...matchingPlaces,
    ]);

    setSelectedItemIndex(null);
  };

  const handleSaveItenory = () => {
    // Check if the new place exists in the custom places array
    const isPlaceInCustomPlaces = customPlaces.some(
      place => place.display_name === newPlace
    );
  
    if (isPlaceInCustomPlaces) {
      setItinerary(prevItinerary => [
        ...prevItinerary,
        {
          place: newPlace,
          startTime: startValue ? startValue.format('HH:mm') : '00:00',
          endTime: endValue ? endValue.format('HH:mm') : '00:00',
        },
      ]);

      setNewPlace('');
      setIsTimePickerOpen(false);
      setSelectedItemIndex(null);
    } else {
      // Handle error - Place not found in custom places
      message.info('Sorry, the selected place is not available. Please choose a place from the suggestion list.');
    }
  };
  

  const handleWholeSaveItenory = () => {
    setItems(itinerary);
    setShow(!show);
    setStartValue(null);
    setEndValue(null);
    setSelectedItemIndex(null);
  };

  const handleTimeChange = () => {
    if (selectedItemIndex !== null) {
      setItinerary(prevItinerary =>
        prevItinerary.map((eachitem, i) => ({
          ...eachitem,
          startTime:
            i === selectedItemIndex && startValue
              ? startValue.format('HH:mm')
              : eachitem.startTime,
          endTime:
            i === selectedItemIndex && endValue
              ? endValue.format('HH:mm')
              : eachitem.endTime,
        }))
      );

      setStartValue(null);
      setEndValue(null);
      setSelectedItemIndex(null);
    }
  };

  const handleRangeChange = values => {
    setStartValue(values[0]);
    setEndValue(values[1]);
  };

  const handleSelectPlace = selectedPlace => {
    onSelectPlace(selectedPlace);
  };

  const handleTimePickerOk = () => {
    if (startValue && endValue) {
      handleTimeChange();
    }
  };

  return (
    <div>
      {itinerary.length > 0 ? (
        itinerary.map((item, index) => (
          <div className="container-display-page5" key={index}>
            <Card className="card-display-page5">
              <Card.Body>
                <div className="card-inner-page5">
                  <div>
                    <Card.Title className="card-display-title-page5">
                      {item.place || 'No Place'}
                    </Card.Title>
                    <Card.Text className="card-text">
                      {selectedItemIndex === index ? (
                        <div className="card-display-text-page5">
                          You are currently editing the time
                        </div>
                      ) : (
                        <div className="card-display-text-page5">
                          {item.startTime && item.endTime ? (
                            <p>
                              Start Time:{' '}
                              {moment(item.startTime, 'HH:mm').format(
                                'HH:mm'
                              )}{' '}
                              | End Time:{' '}
                              {moment(item.endTime, 'HH:mm').format(
                                'HH:mm'
                              )}
                            </p>
                          ) : (
                            <div className="card-display-text-page5">
                              You haven't selected any time
                            </div>
                          )}
                        </div>
                      )}
                    </Card.Text>
                  </div>

                  <div className="card-display-button-container-page5">
                    <div className="icon-container">
                      <Tooltip placement="topRight" title="Set Time">
                        <AccessTimeIcon
                          onClick={() => {
                            setSelectedItemIndex(index);
                            setIsTimePickerOpen(true);
                          }}
                          className="time-icon"
                        />
                      </Tooltip>
                    </div>
                    <Tooltip placement="topRight" title="Delete Item">
                      <DeleteOutlineIcon
                        onClick={() => handleDeleteCard(index, item)}
                      />
                    </Tooltip>
                  </div>
                </div>
                {selectedItemIndex === index && (
                  <div className="timing-info-page5">
                    <div>
                      <TimePicker.RangePicker
                        value={[startValue, endValue]}
                        onChange={handleRangeChange}
                        format="HH:mm"
                        placeholder={['Start Time', 'End Time']}
                        open={isTimePickerOpen}
                        onOpenChange={setIsTimePickerOpen}
                        onOk={handleTimePickerOk}
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: '#FAEF9B',
                          border: '1px solid black',
                          color: 'black',
                          borderRadius: '2vh',
                          marginLeft: '3vw',
                          height: '5vh',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onClick={handleTimeChange}
                      >
                        Set Time
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))
      ) : ( 
        <div className="iteminfo">No items available</div>
      )}

      {show && (<SearchBox
        selectedPlaces={selectedPlaces}
        suggestionList={suggestionList}
        onSelectPlace={handleSelectPlace}
        setNewPlace={setNewPlace}
        newPlace={newPlace}
      />)}

      <div className="setplaces-buttons-page5">
        <div className="button1-page5" onClick={handleSaveItenory}>
          Set Place
        </div>

        <div className="button2-page5" onClick={handleWholeSaveItenory}>
         {show? 'Make Day':'Edit-Day'}
        </div>
      </div>
    </div>
  );
};

export default DynamicListComponent;