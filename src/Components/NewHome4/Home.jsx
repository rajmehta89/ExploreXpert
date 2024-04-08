import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from "./SearchBox";
import search from '../Assets/search.svg';
import calender from '../Assets/calendar.png'
import location from '../Assets/location1.png'

const MainContent = () => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectPosition, setSelectPosition] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false); // State to control visibility of start date picker
    const [showEndDatePicker, setShowEndDatePicker] = useState(false); // State to control visibility of end date picker

    const handleStartDateChange = (date) => {
        if (date >= currentDate) {
            setStartDate(date);
            setShowStartDatePicker(false); // Close the start date picker when a valid date is selected
        } else {
            // Display error message or handle invalid date selection
            toast.error("Start date cannot be less than today's date");
        }
    };

    const handleEndDateChange = (date) => {
        if (date >= startDate || !startDate) {
            setEndDate(date);
            setShowEndDatePicker(false); // Close the end date picker when a valid date is selected
        } else {
            // Display error message or handle invalid date selection
            toast.error("End date cannot be less than the start date");
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        console.log(selectedItem);
        const name=selectedItem.name;
        toast.info(`Searching ${name}`);
        
        try {
            // Data to be sent to the server
            const dataToSend = {
                selectedItem: selectedItem,
                startDate: startDate,
                endDate: endDate
            };

            // Get token from local storage
            const token = localStorage.getItem("token");

            // Headers containing the JWT token for authentication
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // Backend API endpoint URL
            const apiUrl = 'http://localhost:3001/user/api/storeData';

            // Making a POST request to the server
            const response = await axios.post(apiUrl, dataToSend, { headers });

            // If the token is verified and data is stored successfully
            if (response.status === 200) {
                console.log('Data stored successfully!');
                // Navigate to '/MyMap' or do something else
                navigate("/Map");
            } else {
                console.error('Failed to store data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="main-back2">
            <Header />
            <section className="hero-wrap">
                <div className="container1">
                    <div className="row no-gutters align-items-center justify-content-center">
                        <div className="text-center pb-5 overall ">
                            <h1 className="showcase-title1">
                                Discover the most engaging places
                            </h1>
                            <div className="showcase-search3">
                                <div className="filters3">
                                    <div className="filter3">
                                        <div className="search-icon3">
                                            <img src={location} alt="" />
                                        </div>
                                        <div className="search-text3">
                                            <h4>Location</h4>
                                            <h2>Explore</h2>
                                            <SearchBox
                                                selectPosition={selectPosition} setSelectPosition={setSelectPosition} selectedItem={selectedItem} setSelectedItem={setSelectedItem}
                                            />
                                        </div>
                                    </div>
                                    <div className="filter3">
                                        <div className="search-icon3">
                                            <img src={calender} alt="" />
                                        </div>
                                        <div className="search-text3" onClick={() => setShowStartDatePicker(true)}>
                                            <h4>From</h4>
                                            <h2>{startDate ? startDate.toDateString() : "Choose a date"}</h2>
                                            {showStartDatePicker && (
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    withPortal
                                                    onClickOutside={() => setShowStartDatePicker(false)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="filter3">
                                        <div className="search-icon3">
                                            <img src={calender} alt="" />
                                        </div>
                                        <div className="search-text3" onClick={() => setShowEndDatePicker(true)}>
                                            <h4>To</h4>
                                            <h2>{endDate ? endDate.toDateString() : "Choose a date"}</h2>
                                            {showEndDatePicker && (
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    withPortal
                                                    onClickOutside={() => setShowEndDatePicker(false)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="search-button-icon3" onClick={handleSearch}>
                                        <img src={search} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainContent;