import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Login from './Components/LoginSignupFinal/Login.jsx';
import ForgetPassword from './Components/Forget/Forget.jsx';
import Home from './Components/NewHome4/Home';
import MainContent from './Components/NewHome2/MainContent';
import MyMap from './components1/TravelAdvisor/TravelAdvisor';
import Profile from './Components/Profile/Profile';
import { MyContext } from './Components/ReactContext.js';
import ItonoryCreation from './Components/Itenory/Main.js';
import PDFGenrator from './Components/PDFCreation/PDFCreation.js';
import Protected from './Components/Protected.jsx';
import Contact from './Components/ContactUs/ContactUs.jsx';
import Try from './Components/Try/Try.js';
import { Provider } from 'react-redux';
import store from './Components/store/store.js';

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [favplaces, setFavplaces] = useState([]);

  const contextValue = {
    favplaces,
    setFavplaces,
  };

  return (
    <>
      <Provider store={store}>
        <MyContext.Provider value={contextValue}>
          <Router>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/Home" element={<MainContent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Header" element={<Header />} />
              <Route path="/reset-password/:token" element={<ForgetPassword />} />
              <Route path="/Search" element={<Protected Component={Home} />} />  
              <Route path="/Contact" element={<Protected Component={Contact} />} />
              <Route path="/Map" element={<Protected Component={MyMap} />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/ItenoryCreator" element={<PDFGenrator />} />
              <Route path="/Itinerary" element={<ItonoryCreation />} />
              <Route path="/ItineraryGenerator" element={<Try />} />
            </Routes>
          </Router>
        </MyContext.Provider>
      </Provider>
    </>
  );
}

export default App;
