import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import DynamicList from './DynamicList';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import jsPDF from "jspdf";

function DynamicAccordion(props) {
  const { selectedPlaces, suggestionList, onSelectPlace,setSelectedPlaces ,setSuggestionList, customPlaces} = props;
  const [accordionItems, setAccordionItems] = useState([
    {
      header: '5-January,2024',
      itinerary: []
    },
    {
      header: '6-January,2024',
      itinerary: [],
    },
    {
      header: '7-January,2024',
      itinerary: [],
    },
  ]);

  const navigate=useNavigate();

  const handleAccordionItemClick = index => {
    setAccordionItems(prevItems =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: index === i ? !item.isOpen : false,
      }))
    );
  };


  const handleSave = (index, updatedItems) => {
    console.log('Before update:', accordionItems);
    console.log('updated item is:',updatedItems);
    
    setAccordionItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        itinerary: index === i ? updatedItems : item.itinerary,
      }))
    );
  
    console.log('After update:', accordionItems);
  };
  


  const handleItenoryCreation = () => {
    console.log(accordionItems);
    localStorage.setItem('ItenoryData',JSON.stringify(accordionItems));
    navigate('/ItenoryCreator');    
  };

  const handleAddAccordion = () => {
    const dataforDMY = accordionItems[accordionItems.length - 1]?.header;
    // Convert to string and split
    const parts = dataforDMY?.toString().split('-') || [];
    console.log(parts);

    // Check if the header is in the expected format
    if (parts.length === 2) {
      const date = parts[0];
      const [lastMonth, lastyear] = parts[1].split(',');

      const lastDate = new Date(`${lastMonth} ${date}, ${lastyear}`);

      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + 1);

      const nextDay = nextDate.getDate();
      const nextMonth = nextDate.toLocaleString('default', { month: 'long' });
      const nextYear = nextDate.getFullYear();

      // Calculate next date, month, and year here (as shown in the previous response)
      const nextHeader = `${nextDay}-${nextMonth},${nextYear}`;

      // Update the accordionItems state with the new accordion
      setAccordionItems(prevItems => [
        ...prevItems,
        {
          header: nextHeader,
          content: 'There are no activities for this day yet',
          itinerary: [],
        },
      ]);
    } else {
      // Handle the case where the header is not in the expected format
      console.error('Unexpected format for accordion header:', dataforDMY);
    }
  };

  return (
    <div>
      {accordionItems.map((item, index) => (
        <Accordion 
          key={index}
          activeKey={item.isOpen ? index.toString() : undefined}
          flush
          >
         
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header onClick={() => handleAccordionItemClick(index)}>
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
             setSuggestionList={ setSuggestionList}
             customPlaces={customPlaces}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}

      <Button
        onClick={handleAddAccordion}
        style={{
          marginTop:'20px',
          marginRight:'10px',
          cursor: 'pointer',
          color: 'white',
          padding: '10px 12px',
          borderRadius: '4px',
          marginLeft: '10px',
        }}
      >
        Add New Date
      </Button>

      <Button
        onClick={handleItenoryCreation}
        style={{
          marginTop:'20px',
          cursor: 'pointer',
    
          color: 'white',
          padding: '10px 12px',
          borderRadius: '4px',
          marginLeft: '10px',
        }}
      >
        Make An Itenory
      </Button>
    </div>
  );
}

export default DynamicAccordion;
