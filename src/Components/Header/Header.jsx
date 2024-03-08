import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Logo from '../Assets/output-onlinepngtools.png';
import ProfileIcon from '../Assets/profile-icon.png';
import './Header.css';

function Header() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div className="d-flex h3 flex-wrap align-items-center justify-content-between">
      <div className="d-flex align-items-center mx-3">
        <Link to="/" className="d-flex align-items-center mb-lg-0 text-white text-decoration-none">
          <img src={Logo} alt="Logo" />
        </Link>
        <p className="mx-2 header-font">Travel-Tour</p>
      </div>

      <div className='header-font'>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center justify-content-around mb-md-0">
          <li><Link to="/main" className="nav-link px-2 text-white">Home</Link></li>
          <li><Link to="/Home" className="nav-link px-2 text-white">Itinerary</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">Contact Us</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">About Us</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">Help</Link></li>
        </ul>
      </div>

      <div className='header-font d-flex align-items-center justify-content-center'>
        {username && (
          <div className="d-flex align-items-center">
            <p className="text-white">Welcome, {username}</p>
            <Link to="/profile">
              <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
