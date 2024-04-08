// ... (import statements)

import React, { useEffect, useState } from 'react';
import './container.css';
import { Steps } from 'antd';

const CardContainer = () => {
  const [travel, setTravel] = useState(null);
  const [newList, setNewList] = useState(null);

  useEffect(() => {
    const abc = localStorage.getItem('ItenoryData');
    const data = JSON.parse(abc);

    const newDataList = data.map((dayData) => {
      const { header, itinerary, isOpen } = dayData;
      const day = header.split('-')[0];

      const newList = itinerary.map((item) => ({
        title: item.place || 'There is no data available',
        description: `${item.startTime} && ${item.endTime}`,
      }));

      return {
        day,
        isOpen,
        itinerary: newList,
      };
    });

    setTravel(newDataList);
    setNewList(newDataList);
  }, []);  

  const dayInformation = ['Day 1', 'Day 2', 'Day 3'];

  const customDot = (iconDot, { status, index }) => (
    <span
      style={{
        backgroundColor: '#092635',
        borderRadius: '100%',
        display: 'block',
        width: '9px',
        height: '9px',
      }}
    />
  );

  return (
    <>
      <div className='main-container-page6'>
        <div className='right-side2-left-page6'>
          <div style={{ fontSize: '2rem', display: 'flex', flexWrap: 'nowrap' }}>
            {newList && newList.length} DAY ITINERARY
          </div>
        </div>

        {newList &&
          newList.map((day, index) => (
            <div className='card-container-page6' key={index}>
              <div className='left-side2-page6'>
                <div className='day-box-page6'>
                  <div className='day-info-page6'>Day {index+1}</div>
                </div>
              </div>

              <div className='right-side2-page6' key={index}>
                <Steps
                  style={{ color: 'black', fontSize: '16px', fontFamily: 'serif' }}
                  progressDot={customDot}
                  direction='vertical'
                  size='1rem'
                  items={day.itinerary.map((item, i) => ({
                    ...item,
                    description: <div style={{ fontSize: '30px' }}>{item.description}</div>,
                  }))}
                  theme={{
                    token: {
                      customIconFontSize: 36,
                    },
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CardContainer;
