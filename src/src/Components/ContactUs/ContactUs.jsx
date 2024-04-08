import React, { useState } from 'react';
import Header from '../Header/Header';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming the form is submitted successfully
    // You can replace this with your actual form submission logic

    // Show toast message for successful submission
    toast.success('Form submitted successfully!');
    // Clear form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className='contact-back'>
      <Header />
      <div className="contact-us-container">
        <div className="contact-us-left">
          <div className="contact-us-left-content">
            <h1 className="contact-us-title font-tusker header-title">The sky is waiting!!!</h1>
            <p className="contact-us-description">
              Explore the world and discover new adventures. Contact us now to start planning your dream trip!
            </p>
            <p className='contact-us-description'>
              <a href="#contact-form" className="form-link">Reach out to us by sending a message</a>
            </p>
          </div>
        </div>
        <div className="contact-us-right" id="contact-form">
          <div className="contact-us-form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-us-form-group">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="contact-us-form-group">
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="contact-us-form-group">
                <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="contact-us-form-group">
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <div className="contact-us-form-group">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
