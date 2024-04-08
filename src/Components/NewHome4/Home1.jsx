import React from 'react';
import './Home.css';
import globeImage from '../Assets/earth.jpeg'; // Adjust the path to your image

const Home = () => {
  return (
    <div>
      {/* Showcase */}
      <main className="main" id="home">
        {/* showcase-content */}
        <div className="showcase-content">
          <h1>Discover the most engaging places</h1>
          <a href="https://earth.google.com/web/" target="_blank" className="showcase-button">
            <img src={globeImage} alt="Discover on 3D globe" /> Discover on 3D globe
          </a>
        </div>

        {/* showcase-search */}
        <div className="showcase-search">
          <div className="filters">
            <div className="filter">
              <div className="search-icon">
                <img src="/Imgs/icons/location.png" alt="" />
              </div>
              <div className="search-text">
                <h4>Location</h4>
                <h2>Explore nearby </h2>
              </div>
            </div>
            {/* Other filters */}
          </div>
          <div className="search-button-icon">
            <img src="/Imgs/icons/search.svg" alt="" />
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default Home;
