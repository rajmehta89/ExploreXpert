import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';
import Logo from '../Assets/output-onlinepngtools.png';
import ProfileIcon from '../Assets/profile-icon.png';
import { toast } from 'react-toastify';
import './Header.css';

function Header() {
  const [username, setUsername] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post('http://localhost:3001/user/getUsername', { token });
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }
    fetchUsername();
  }, []);

  const handleToggleNav = () => {
    setShowNav(!showNav);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post('http://localhost:3001/user/logout', { token });

      if (response.status === 200) {
        console.log('Logout Successful');
        toast.success('Logout successful');
        localStorage.removeItem('token');
        window.location.href = '/main'; // Remove token from local storage upon successful logout
      } else {
        console.error('Logout failed:', response.data.message);
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="d-flex h3 flex-wrap align-items-center justify-content-between">
      <div className="d-flex align-items-center mx-3">
        <Link to="/" className="d-flex align-items-center mb-lg-0 text-black text-decoration-none">
          <img src={Logo} alt="Logo" />
        </Link>
        <p className="mx-2 header-font">Travel-Tour</p>
      </div>

      <div className='header-font'>
        <button className="toggle-button" onClick={handleToggleNav}>
          <FaBars />
        </button>
        <ul className={`nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center justify-content-around mb-md-0 ${showNav ? 'show' : ''}`}>
          <li><Link to="/main" className="nav-link px-2 text-white">Home</Link></li>
          <li><Link to="/Home" className="nav-link px-2 text-white">Itinerary</Link></li>
          <li><Link to="/Contact" className="nav-link px-2 text-white">Contact Us</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">About Us</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">Help</Link></li>
        </ul>
      </div>

      {windowWidth >= 768 ? (
        <div className='header-font d-flex align-items-center justify-content-center'>
          {username && <p className="text-white mx-2">{username}</p>}
          {!username ? (
            <Link to="/login" className="button1">Sign In</Link>
          ) : (
            <div className="dropdown">
              <button type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: 'transparent' }}>
                <img src={ProfileIcon} alt="Profile Icon" className="profile-icon1" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}

        </div>
      ) : null}

    </div>
  );
}

export default Header;
