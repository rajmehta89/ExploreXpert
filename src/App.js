import React,{useState} from 'react';
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
import Profile from './Components/Profile/Profile';
import context from './Components/ReactContext.js';
import ItonoryCreation from './Components/Itenory/Main.js';
import PDFGenrator from './Components/PDFCreation/PDFCreation.js';

import  {Provider} from 'react-redux';
import store from './Components/Redux_management/store.js';


function App() {


  const [favplaces,setfavplaces]=useState([]);

  const contextvalue={
    favplaces,
    setfavplaces,
  }

  return (
    <>

    <Provider store={store}>
    <context.Provider value={contextvalue}>
      <Router>
        <Routes>
          <Route path="/main" element={<MainContent />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
      
          <Route path="/Header" element={<Header />} />
          <Route path="/reset-password/:token" element={<ForgetPassword/>}/>
          <Route path="/Home" element={<Home />} />
          <Route path="/My" element={<My />} />
          <Route path="/Options" element={<OptionsPage />} />
          <Route path="/MyMap" element={<MyMap />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/ItenoryCreator" element={<PDFGenrator/>} />
          <Route path="/Itenory" element={<ItonoryCreation/>} />
        </Routes>
      </Router>
      </context.Provider>
      </Provider> 
    </>
  );
}

export default App;
