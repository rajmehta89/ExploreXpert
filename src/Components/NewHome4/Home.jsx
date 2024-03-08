import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import SearchBox from "./SearchBox";

const MainContent = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectPosition, setSelectPosition] = useState(null);
    const [selectedItem,setSelectedItem]=useState(null);
    

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        if (newStartDate > endDate) {
            setStartDate(newStartDate);
        }
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        if (newEndDate >= startDate) {
            setEndDate(newEndDate);
        }
    };

    const buttonOnClickHandler = () => {
        console.log(selectPosition);
        localStorage.setItem('selectedItem',JSON.stringify(selectedItem));
        navigate('/MyMap');
    };

    return (
        <div className="main-back1">
            <Header />
            <section className="hero-wrap">
                <div className="container1">
                    <div className="row no-gutters align-items-center justify-content-center">
                        <div className="text-center pb-5 overall">
                            <div className="row justify-content-center">
                                <div className="col-lg-9 overall-top">
                                    <h1 className="city">Let's Explore Your Awesome City</h1>
                                    <p>Find great places to stay, eat, shop, or visit from local experts.</p>
                                </div>
                            </div>

                            <div className="overall-bottom">
                           
                                <form action="../Search/search1.html" className="search1 mt-md-5" method="GET">
                                <div>
                                <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}  selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                                </div>  
                                    <div className="container2">
                                   
                                        <div className="col-md d-flex">
                                            <div className="form-field1 p-3">
   {/* <input type="text" id="searchBox" className="form-control1" placeholder="Search Location" />  */}
                                       
                                                <input type="date" className="form-control1" placeholder="Start Date" value={startDate} onChange={handleStartDateChange} min={currentDate} />
                                                <input type="date" className="form-control1" placeholder="End Date" value={endDate} min={startDate} onChange={handleEndDateChange} />
                                                <select name="" id="" className="form-control1">
                                                    <option value="">All Categories</option>
                                                    <option value="">Food &amp; Drinks</option>
                                                    <option value="">Hotel</option>
                                                    <option value="">Shopping</option>
                                                    <option value="">Beauty</option>
                                                    <option value="">Fitness</option>
                                                    <option value="">Bar &amp; Club</option>
                                                    <option value="">Games</option>
                                                    <option value="">Places</option>
                                                    <option value="">Circus</option>
                                                    <option value="">Theater</option>
                                                    <option value="">Sports</option>
                                                    <option value="">Health</option>
                                                </select>
                                                <a href="#" className="btn btn-primary form-control1" onClick={buttonOnClickHandler}><span>Search</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainContent;
