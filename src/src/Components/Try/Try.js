import React, { useRef, useState } from 'react';
import './Try.css';
import Container from './contaier';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useEffect } from 'react';


const ResponsiveContainers = () => {

  useEffect(() => {
    fetchProfileData();
  }, []);

  const  [profile, setProfile] = useState(null);
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.get('http://localhost:3001/user/api/profile', { headers });
      const data = response.data;
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  const pdfRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);

  const downloadButton = async () => {
    const input = pdfRef.current;
    // Toggle class to hide download button while generating PDF
    input.classList.add('hide-download-button');

    setLoading(true);
    setShowHeaderFooter(true); // Show header and footer

    // Add a delay to allow layout changes to take effect
    setTimeout(() => {
      html2canvas(input, {
        scale: 2,
        logging: true,
        allowTaint: false,
        useCORS: true,
      }).then((canvas) => {
        const pdf = new jsPDF('l', 'mm', 'a4', true);
        const imgData = canvas.toDataURL('image/png', 2.0);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;
        console.log(profile.user);
        console.log(profile.user.username);
        const name = profile?.user.username || '';
const place = profile?.user.selectedItems && profile.user.selectedItems.length > 0 ? profile.user.selectedItems[0].name : '';

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${name}_${place}.pdf`);

        // Remove class to show download button again after PDF generation
        input.classList.remove('hide-download-button');

        setLoading(false);
        setShowHeaderFooter(false); // Hide header and footer after download
      });
    }, 500); // Adjust the delay as needed
  };

  return (
    <>
      <div ref={pdfRef}>
        {showHeaderFooter && (
          <>
            {/* Header */}
            <header className="pdfheader">
              <div className="company-info">
                <p className="company-name">Adventure Travels</p>
                <p className="company-address">123 Adventure Road, Explorer City, Adventureland</p>
                {/* Add any other company information here */}
              </div>
            </header>
          </>
        )}

        <div className={`two-sided-container ${loading ? 'two-sided-disabled' : ''}`} style={{ marginBottom: showHeaderFooter ? '0' : '' }}>
          <div className="left-side-page6">
            {/* Your other content goes here */}
          </div>
          <div className="centered-text"></div>
          <div className="right-side-page6">
            {/* Content for the right side */}
            <Container />
          </div>
        </div>

        {/* Download button placed between content and footer */}
        <div className="pdfsavebutton-page6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={downloadButton}
            disabled={loading}
          >
            {loading ? 'Downloading...' : 'Download'}
          </button>
        </div>

        {showHeaderFooter && (
          <footer className="pdffooter" style={{ marginTop: '0' }}>
            <div className="footer-info">
              <div className="footer-text">
                <p>&copy; {new Date().getFullYear()} Adventure Travels. All rights reserved.</p>
                <p>Designed with <span role="img" aria-label="love">❤️</span> by Adventure Team</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default ResponsiveContainers;