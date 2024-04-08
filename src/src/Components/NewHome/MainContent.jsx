import React, { useState } from "react";
import "./MainContent.css";
import slides from "./slides";
import Header from "../Header/Header";

const MainContent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundBrightness, setBackgroundBrightness] = useState(0);

    // Function to calculate background brightness
    const calculateBackgroundBrightness = () => {
        // Calculate background brightness logic here
        // For example:
        const brightness = calculateBrightness(slides[currentIndex].background);
        setBackgroundBrightness(brightness);
    };

    // Function to calculate brightness
    const calculateBrightness = (background) => {
        // Example logic to calculate brightness
        // You can replace this with your actual implementation
        // Here, we're assuming a simple calculation based on RGB values
        const { r, g, b } = getRGBValues(background);
        return (r + g + b) / 3; // Simple average of RGB values
    };

    // Function to get RGB values from a color string
    const getRGBValues = (color) => {
        // Example implementation to extract RGB values from a color string
        // You can replace this with your actual implementation
        // Here, we're assuming color is in the format "rgb(r, g, b)"
        const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
        const matches = color.match(regex);
        if (matches) {
            return {
                r: parseInt(matches[1]),
                g: parseInt(matches[2]),
                b: parseInt(matches[3])
            };
        }
        return { r: 0, g: 0, b: 0 }; // Default values if color string doesn't match
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
        calculateBackgroundBrightness(); // Recalculate background brightness on slide change
    };

    const displayImage = (index) => {
      const realIndex = (currentIndex + index) % slides.length;
      return (
          <div className="highlight-item">
              <img src={slides[realIndex].image} alt={`Image ${realIndex}`} className="highlight-image" />
              <p className="highlight-description">{slides[realIndex].highlightDescription}</p>
          </div>
      );
  };
  

    const backgroundImageStyle = {
        backgroundImage: `url(${slides[currentIndex].background})`
    };

    return (
        <div className="main-back" style={backgroundImageStyle}>
            <Header />
            <main className="main-content">
                <div className="content-container">
                    <h2 className="country-name" style={{ color: backgroundBrightness < 128 ? 'white' : 'black' }}>{slides[currentIndex].country}</h2>
                    <p className="country-description" style={{ color: backgroundBrightness < 128 ? 'white' : 'black' }}>{slides[currentIndex].description}</p>
                    <button className="explore-button" style={{ backgroundColor: backgroundBrightness < 128 ? '#333' : '#ccc', color: backgroundBrightness < 128 ? 'white' : 'black' }}>Explore &gt;</button>
                </div>
                <div className="highlight-container">
                    <div className="highlight-carousel">
                        {displayImage(0)}
                        {displayImage(1)}
                        {displayImage(2)}
                        {/* Add more displayImage calls as needed */}
                    </div>
                    <button className="next-button" onClick={nextSlide}>Next</button>
                </div>
            </main>
        </div>
    );
};

export default MainContent;
