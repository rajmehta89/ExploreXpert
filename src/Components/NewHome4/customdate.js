import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customdate.css'; // Import default styles for React Datepicker

const CustomDatePicker = ({ startDate, handleStartDateChange, currentDate ,text}) => {
    return (
        <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText={text}
            minDate={new Date(currentDate)}
            dateFormat="yyyy-MM-dd"
            className="custom-date-picker" // Add a custom class name
            style={{ width: '100%' }} // Set width to 100% and height to auto

        />
    );
};

export default CustomDatePicker;
