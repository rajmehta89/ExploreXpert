// ResponsiveContainers.jsx

import React,{useRef,useEffect,useState} from 'react';
import './Try.css'; 
import Container from './contaier';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const ResponsiveContainers = () => {
  const pdfRef = useRef();


  const downloadButton = () => {
    const input = pdfRef.current;
    
  
    html2canvas(input, { scale: 2, logging: true, allowTaint: false, useCORS: true }).then(
      (canvas) => {
        const pdf = new jsPDF("l", "mm", "a4", true);
        const imgData = canvas.toDataURL("image/png", 2.0); // Use 2.0 scale for higher resolution
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;
  
        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save("Ambition.pdf");
      }
    );
  };

  return (

    <>
   
    <div className='pdfsavebutton-page6'>
    <button
              type="button"
              class="btn btn-secondary"
              onClick={downloadButton}
            >
              Download
    </button>
    </div>

    <div ref={pdfRef}>
    
    <div className="pdfheader-page6">
    <h1>Ambition Trip</h1>
    <p>
      <div>
        <LocationOnIcon color="secondary" />SHOP NO – 2 Kabir Complex, next to Diamond trade centre, dalgiya maholla, Mahidharpura, surat.
      </div>
      <div style={{marginBottom:'2rem'}}>
        <MarkunreadIcon color="secondary"/>EMAIL ID – rajm267747@gmail.com
      </div>
    </p>
  </div>

    <div className="two-sided-container">
      <div className="left-side-page6">
        {/* Content for the left side */}
        <div className="centered-text"></div>
      </div>
      <div className="right-side-page6">
        {/* Content for the right side */}

        <Container/>

      </div>
    </div>
    </div>
    </>
  );
};

export default ResponsiveContainers;
