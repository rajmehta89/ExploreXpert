// MainContent.js

import React, { useState, useEffect } from "react";
import "./MainContent.css";
import slides from "./slides";
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';

const MainContent = ({ currentPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundBrightness, setBackgroundBrightness] = useState(0);
    const [contentTop, setContentTop] = useState('50%');
    const [isLoading, setIsLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        preloadImages();
        calculateContentTop();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (currentPage === 'MainContent') {
            document.body.style.backgroundImage = `url(${slides[currentIndex].background})`;
        } else {
            document.body.style.backgroundImage = 'none';
        }
    }, [currentIndex, currentPage]);

    const preloadImages = () => {
        slides.forEach(slide => {
            const image = new Image();
            image.src = slide.background;
        });
    };

    const calculateBackgroundBrightness = () => {
        const image = new Image();
        image.src = slides[currentIndex].background;
        image.onload = () => {
            const brightness = calculateBrightness(image);
            setBackgroundBrightness(brightness);
            setIsLoading(false);
        };
    };

    const calculateBrightness = (image) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        let totalBrightness = 0;
        const sampleSize = 100;
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const pixels = imageData.data;

        for (let i = 0; i < sampleSize; i++) {
            const index = Math.floor(Math.random() * pixels.length / 4) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            totalBrightness += (r + g + b) / 3;
        }
        return totalBrightness / sampleSize;
    };

    const calculateContentTop = () => {
        const mainBackHeight = document.getElementById('main-back').offsetHeight;
        const contentHeight = document.querySelector('.content-container').offsetHeight;
        const topPosition = (mainBackHeight - contentHeight) / 2;
        setContentTop(`${topPosition}px`);
    };

    const nextSlide = () => {
        setIsLoading(true);
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const previousSlide = () => {
        setIsLoading(true);
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    const displayImage = (index) => {
        const realIndex = (currentIndex + index) % slides.length;
        const isActive = index === 0;
        const classNames = `highlight-item ${isActive ? 'active' : ''}`;

        if (windowWidth < 400 && index >= 2) {
            return null;
        }
        const aspectRatio = slides[realIndex].imageWidth / slides[realIndex].imageHeight;
        const height = aspectRatio * 1.5;

        return (
            <div className={classNames}>
                <p className={`highlight-description ${backgroundBrightness < 128 ? 'light-background' : 'dark-background'}`}>{slides[realIndex].highlightDescription}</p>
                <img src={slides[realIndex].image} alt={`Image ${realIndex}`} className="highlight-image" style={{ height: `${height}px` }} />
            </div>
        );
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${slides[currentIndex].background})`
    };

    const buttonOnClickHandler = () => {
        navigate('/Home');
    };

    return (
        <div className="grandparent">
            <div id="main-back" className="main-back" style={backgroundImageStyle}>
                <Header />
                <main className="main-content">
                    <div className="content-container" style={{ top: contentTop }}>
                        <h2 className={`country-name`}>{slides[currentIndex].country}</h2>
                        <p className={`country-description ${backgroundBrightness < 128 ? 'light-background' : 'dark-background'}`}>{slides[currentIndex].description}</p>
                        <button className="explore-button" style={{ backgroundColor: backgroundBrightness < 128 ? '#333' : '#ccc', color: backgroundBrightness < 128 ? 'white' : 'black' }} onClick={buttonOnClickHandler}>Explore &gt;</button>
                    </div>
                    <div className="highlight-container">
                        <div className="highlight-carousel">
                            {displayImage(0)}
                            {displayImage(1)}
                            {displayImage(2)}
                        </div>
                        &nbsp;&nbsp;
                        <div className="nav-buttons">
                            <button className="button prev" onClick={previousSlide}>{'<'}</button>
                            <button className="button next" onClick={nextSlide}>{'>'}</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainContent;
