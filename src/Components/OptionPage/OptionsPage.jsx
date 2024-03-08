// src/components/OptionsPage.js
import React, { useState } from 'react';
import './OptionsPage.css';

const OptionsPage = ({ location, onSelectedOptionsChange, onSelectedOptionChangeMap, onShowMap }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activitiesPerDay, setActivitiesPerDay] = useState('1-2'); // Set a default value

  function handleOnClickToMap() {
    if (!selectedOptions || selectedOptions.length === 0) {
      onShowMap(false);
      prompt('You have not selected any activity');
    } else {
      onShowMap(true);
    }
  }

  const activityOptions = [
    'Outdoor Activities',
    'Art',
    'Museum',
    'Shopping',
    'Amusement',
    'Restaurants',
    'Nightlife',
    'Sports',
    // Add more options as needed
  ];

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  const handleActivitiesPerDayClick = (activities) => {
    setActivitiesPerDay(activities);
  };

  // Pass selectedOptions to the parent component using the callback prop
  React.useEffect(() => {
    onSelectedOptionsChange(selectedOptions);
    onSelectedOptionChangeMap(selectedOptions);
  }, [selectedOptions, onSelectedOptionsChange, onSelectedOptionChangeMap]);

  return (
    <div className="options-page-container">
      <header>
        <h1>Explore {location}</h1>
      </header>

      <main>
        <p style={{ color: 'black', fontSize: '20px' }}>What do you want to do in {location}?</p><br></br>
        <ul>
          {activityOptions.map((option) => (
            <li key={option}>
              <button
                className={selectedOptions.includes(option) ? 'selected' : ''}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        <div>
          <h2 style={{ color: 'white' }}>Great choices! Let's explore {selectedOptions.join(', ')} in {location}.</h2>

          <div>
            <p style={{ color: 'black' }}>How many activities would you like to do per day?</p><br></br>
            <ul>
              <li>
                <button
                  className={activitiesPerDay === '1-2' ? 'selected' : ''}
                  onClick={() => handleActivitiesPerDayClick('1-2')}
                >
                  1-2 activities
                </button>
              </li>
              <li>
                <button
                  className={activitiesPerDay === '2-3' ? 'selected' : ''}
                  onClick={() => handleActivitiesPerDayClick('2-3')}
                >
                  2-3 activities
                </button>
              </li>
              <li>
                <button
                  className={activitiesPerDay === 'more-than-3' ? 'selected' : ''}
                  onClick={() => handleActivitiesPerDayClick('more-than-3')}
                >
                  More than 3 activities
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button onClick={() => handleOnClickToMap()}>Show Map</button>
        <br>
        </br><br></br>
      </main>
    </div>
  );
};

export default OptionsPage;
