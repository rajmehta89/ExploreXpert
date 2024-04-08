import React, { useRef, useEffect, useState } from 'react';
import './Try.css';
import Container from './contaier';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResponsiveContainers = () => {
  const pdfRef = useRef();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationId = async (placeName) => {
      const url = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${placeName}&lang=en_US&units=km`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '73609664e8msh5d59619de2e8cc3p1c272cjsn240699753fc6',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };
    
      try {
        const response = await fetch(url, options);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
    
        console.log('API Response:', data);
    
        const locationId = data?.data?.Typeahead_autocomplete?.results[0]?.detailsV2?.locationId;
    
        if (!locationId) {
          throw new Error('Location ID not found in the response');
        }
    
        return locationId;
      } catch (error) {
        console.error('Error getting locationId:', error.message);
        return null;
      }
    };
    
    const getPhotosForLocation = async (locationId) => {
      const url = 'https://travel-advisor.p.rapidapi.com/photos/v2/list?currency=USD&units=km&lang=en_US';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '73609664e8msh5d59619de2e8cc3p1c272cjsn240699753fc6',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	},
	body: {
		albumId: '',
		galleryConfig: 'ar',
		locationIdStr: locationId,
		offset: 0,
		updateToken: ''
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result,'results are here....');
} catch (error) {
	console.error(error);
}
    }
   
      
    const placeName = 'eiffel tower';
    getLocationId(placeName).then((locationId) => {
      if (locationId) {
        getPhotosForLocation(locationId);
      }
    });

  }, []);  

  const downloadButton = async () => {
    const input = pdfRef.current;

    html2canvas(input, {
      scale: 2,
      logging: true,
      allowTaint: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        const img = new Image();
        img.src = imageUrl;
        clonedDoc.body.appendChild(img);
      },
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

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Ambition.pdf');
      setLoading(false);
    });
  };

  return (
    <>
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

      <div ref={pdfRef}>
        <div className="pdfheader-page6">
          {/* ... (rest of the code) */}
        </div>

        <div className="two-sided-container">
          <div
            className="left-side-page6"
            style={{
              width: '40%',
              background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : 'none',
              overflowY: 'auto',
            }}
          >
            {/* Your other content goes here */}
          </div>

          <div className="centered-text"></div>

          <div className="right-side-page6">
            <Container />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveContainers;
