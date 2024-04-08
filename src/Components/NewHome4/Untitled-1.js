
  };

  const handleTimeChange = (index) => {
    setSelectedItemIndex(index);
  };

  const handleSelectPlace = (selectedPlace) => {
    onSelectPlace(selectedPlace);
  };

  return (
    <div>
      {Array.isArray(itinerary) && itinerary.length > 0 ? (
        itinerary.map((item, index) => (
          <div className='container-display-page5' key={index}>
            <Card className='card-display-page5'>
              <Card.Body>
                <div className="card-inner-page5">
                  <div>
                    <Card.Title className='card-display-title-page5'>{item.place ? item.place : 'No Place'}</Card.Title>
                    <Card.Text className="card-text">
                      {selectedItemIndex === index ? (
                        <div className='card-display-text-page5'>You are currently editing the time</div>
                      ) : (
                        <div className='card-display-text-page5'>
                          {item.startTime && item.endTime ? (
                            <p>
                              Start Time: {item.startTime} | End Time: {item.endTime}
                            </p>
                          ) : (
                            <div className='card-display-text-page5'>You haven't selected any time</div>
                          )}
                        </div>
                      )}
                    </Card.Text>
                  </div>

                  <div className='card-display-button-container-page5'>
                    <div className="icon-container">
                      <Tooltip placement="topRight" title="set-time">
                        <AccessTimeIcon
                          onClick={() => handleTimeChange(index)}
                          className='time-icon'
                        />
                      </Tooltip>
                    </div>
                    <Tooltip placement="topRight" title="delete-item">
                      <DeleteOutlineIcon onClick={() => handleDeleteCard(index, item)} />
                    </Tooltip>
                  </div>
                </div>

                {selectedItemIndex !== null && selectedItemIndex === index && (
                  <>
                    <div>
                      <TimePicker.RangePicker
                        format="HH:mm"
                        value={timeRange[index]}
                        onChange={handletimeChange}
                        needConfirm={true}
                      />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Button type="primary" onClick={handleSaveItenory}>
                        Set Time
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div className='iteminfo'>No items available</div>
      )}

      <SearchBox
        selectedPlaces={selectedPlaces}
        suggestionList={suggestionList}
        onSelectPlace={handleSelectPlace}
        setNewPlace={setNewPlace}
        newPlace={newPlace}
      />
 
     
      <div className='setplaces-buttons-page5'>
      <div className='button1-page5'
      onClick={handleSaveItenory}
      >
         Set Place
      </div>
 

      <div className='button2-page5' 
      onClick={handleWholeSaveItenory}
      >
        Make Day
      </div>
      
      </div>
    
    </div>
  );
};

export default DynamicListComponent;
