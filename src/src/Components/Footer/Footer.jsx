// src/components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div className="custom-footer">
      <div className="container1">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h4 className="text-uppercase">Travel Planner</h4>
            <p>Plan your next adventure with us and make the most out of your journey.</p>
          </div>
          <div className="col-md-3 mb-4">
            <h4 className="text-uppercase">Explore</h4>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white">
                  Outdoor Activities
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Art & Culture
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Museums
                </a>
              </li>
              {/* Add more options */}
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4 className="text-uppercase">Connect</h4>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4 className="text-uppercase">Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faFacebookF} className="me-4" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faTwitter} className="me-4" />
              </a>
              <a href="#" className="text-white">
                <FontAwesomeIcon icon={faInstagram} className="me-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Travel Planner. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;