import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import My from './Components/OptionPage/Map.jsx';
import Login from './Components/LoginSignupFinal/Login.jsx';
import ForgetPassword from './Components/Forget/Forget.jsx';
import Home from './Components/NewHome4/Home';
import OptionsPage from './Components/OptionPage/OptionsPage.jsx';
import MainContent from './Components/NewHome2/MainContent';
import MyMap from './components1/TravelAdvisor/TravelAdvisor';
import MapPage from './Components/Map/MyMap';
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
              <Route path="/main" element={<MainContent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Header" element={<Header />} />
              <Route path="/reset-password/:token" element={<ForgetPassword />} />
              <Route path="/Home" element={<Protected Component={Home} />} />
              <Route path="/Options" element={<Protected Component={OptionsPage} />} />
              <Route path="/My" element={<Protected Component={My} />} />
              <Route path="/Contact" element={<Protected Component={Contact} />} />
              <Route path="/MyMap" element={<Protected Component={MyMap} />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/ItenoryCreator" element={<PDFGenrator />} />
              <Route path="/Itenory" element={<ItonoryCreation />} />
              <Route path="/Try" element={<Try />} />
            </Routes>
          </Router>
        </MyContext.Provider>
      </Provider>
    </>
  );
}

export default App;
