import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import DynamicList from './DynamicList';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ItoneryCreator.css';
import axios from "axios";

function DynamicAccordion(props) {
  const { selectedPlaces, suggestionList, onSelectPlace, setSelectedPlaces, setSuggestionList, customPlaces } = props;
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  // Retrieve start and end dates from localStorage

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem("token");
        console.log("token", token);

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
          console.log(data.startDate);
          console.log(data.endDate);

          if (data.startDate && data.endDate) {
            console.log('User data fetched successfully:', response.data.data);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setAccordionItems(generateAccordionItems(data.startDate, data.endDate));
          } else {
            console.log("Start and end dates are empty.");
          }
        } else {
          console.error('Failed to fetch user data:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


    // Generate accordion items between start and end dates
    const generateAccordionItems = (startDate, endDate) => {
      if (!startDate || !endDate) {
        return []; // Return empty array if start or end dates are empty
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log(startDate);
      console.log(endDate);

      const accordionItems = [];

      while (start <= end) {
        const formattedDate = `${start.getDate()}-${start.toLocaleString('default', { month: 'long' })},${start.getFullYear()}`;
        accordionItems.push({
          header: formattedDate,
          itinerary: []
        });

        // Move to the next day
        start.setDate(start.getDate() + 1);
      }

      return accordionItems;
    };

    // Call fetchData on component mount
    fetchData();
  }, []);

  const [accordionItems, setAccordionItems] = useState([]);

  const handleAccordionItemClick = index => {
    setAccordionItems(prevItems =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: index === i ? !item.isOpen : false,
      }))
    );
  };

  const handleSave = (index, updatedItems) => {
    setAccordionItems(prevItems =>
      prevItems.map((item, i) => ({
        ...item,
        itinerary: index === i ? updatedItems : item.itinerary,
      }))
    );
  };

  const handleItenoryCreation = async () => {
    setShow(!show);
    toast.success("Itinerary created successfully!");
    localStorage.setItem('ItenoryData', JSON.stringify(accordionItems));

    try {

      // Get token from local storage
      const token = localStorage.getItem("token");

      // Headers containing the JWT token for authentication
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Backend API endpoint URL
      const apiUrl = 'http://localhost:3001/user/api/storeAccordionData';

      console.log(accordionItems);

      // Making a POST request to the server
      const response = await axios.post(apiUrl, { accordionItems }, { headers });

      // If the token is verified and data is stored successfully
      if (response.status === 200) {
        console.log('Data stored successfully!');
        navigate('/ItineraryGenerator');
      } else {
        console.error('Failed to store data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddAccordion = () => {
    if (!startDate || !endDate) {
      // Show UI error if start or end date is missing
      alert('Please select start and end dates for the itinerary.');
      return;
    }

    // Find the last date in the accordion items
    const lastItem = accordionItems[accordionItems.length - 1];
    const [date, monthYear] = lastItem.header.split('-');
    const [month, year] = monthYear.split(',');

    // Parse the current date
    const currentDate = new Date(`${month.trim()} ${parseInt(date)}, ${parseInt(year)}`);

    // Calculate the next date
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // Check if the next date is in the next month or year
    let nextMonth = nextDate.getMonth();
    let nextYear = nextDate.getFullYear();

    // If the next month is January and it's different from the current month, increment the year
    if (nextMonth === 0 && nextMonth !== currentDate.getMonth()) {
      nextYear++;
    }

    // Format the next date
    let nextMonthName = nextDate.toLocaleString('default', { month: 'long' });
    let nextFormattedDate = `${nextDate.getDate()}-${nextMonthName},${nextYear}`;

    toast.success(`${nextFormattedDate} added`);
    // Add the next date to the accordion items
    setAccordionItems(prevItems => [
      ...prevItems,
      {
        header: nextFormattedDate,
        itinerary: [],
      },
    ]);
  };

  return (
    <div>
      {show ? accordionItems.map((item, index) => (
        <Accordion
          key={index}
          activeKey={item.isOpen ? index.toString() : undefined}
          flush
        >
          <Accordion.Item eventKey={index.toString()} style={{ backgroundColor: 'white' }}>
            <Accordion.Header onClick={() => handleAccordionItemClick(index)} style={{ color: 'black' }}>
              {item.header}
            </Accordion.Header>
            <Accordion.Body>
              <DynamicList
                items={item.itinerary}
                setItems={(updatedItems) => handleSave(index, updatedItems)}
                selectedPlaces={selectedPlaces}
                suggestionList={suggestionList}
                onSelectPlace={onSelectPlace}
                setSelectedPlaces={setSelectedPlaces}
                setSuggestionList={setSuggestionList}
                customPlaces={customPlaces}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )) : 'Itinerary Is Created here..'}

      <div className='setplaces-buttons-page5'>
        <div className='button1-page5' onClick={handleAddAccordion}>
          Add New Date
        </div>
        <div className='button2-page5' onClick={handleItenoryCreation}>
          {show ? 'Make An Itinerary' : 'Edit-An-Itinerary'}
        </div>
      </div>
    </div>
  );
}

export default DynamicAccordion;
