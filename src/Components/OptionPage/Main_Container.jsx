import React, { useState } from 'react';
import OptionsPage from './OptionsPage';
import './Main_Container.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Map from '../Map/Map';

function Main_Container({ location, onSelectedOptionsChange }) {
  const [optionOnMap, setOptionOnMap] = useState([]);
  const [isShowMap, setToShowMap] = useState(false);

  return (
    <>
      <Header />
      <div className="main_contain">
        <div className="side1">
          <OptionsPage
            location={location}
            onSelectedOptionsChange={onSelectedOptionsChange}
            onSelectedOptionChangeMap={setOptionOnMap}
            onShowMap={setToShowMap}
          />
        </div>
        <div className="side2">
          <Map tickMarkPoints={optionOnMap} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main_Container;
