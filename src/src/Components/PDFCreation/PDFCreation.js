import React ,{useRef,useEffect,useState}from 'react';
import { Table } from 'antd';
import './PDFCreation.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const TravelItinerary = () => {

    const pdfRef = useRef();
    const [travelData,settravelData]=useState([]);

    useEffect(()=>{
      const gettraveldata=localStorage.getItem('ItenoryData');
      const retriveddata=JSON.parse(gettraveldata);
      settravelData(retriveddata);
    });

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
      
    
  const components = {
    body: {
      row: ({ children, ...restProps }) => (
        <tr style={{ backgroundColor: '#e6f7ff' }} {...restProps}>
          {children}
        </tr>
      ),
    },
  };
  
  const centeredCellStyle = {
    textAlign: 'center',
  };

  return (

    <>

    <div className='pdfsavebutton'>
    <button
              type="button"
              class="btn btn-secondary"
              onClick={downloadButton}
            >
              Download
    </button>
    </div>
            
    <div ref={pdfRef}>

      <header className="pdfheader">
        <h1>Ambition Trip</h1>
        <p>
          <div>
            <LocationOnIcon color="secondary" />SHOP NO – 2 Kabir Complex, next to Diamond trade centre, dalgiya maholla, Mahidharpura, surat.
          </div>
          <div>
            <MarkunreadIcon color="secondary" />EMAIL ID – rajm267747@gmail.com
          </div>
        </p>
      </header>

      <main className="pdfmain">
        {travelData.map((dayData, index) => (
          <div key={index}>
            <div className='dayheader'><h3>{dayData.header}</h3></div>
            <Table
              dataSource={dayData.itinerary}
              columns={[
                { title: 'Place', dataIndex: 'place', key: 'place' },
                { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
                { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
              ]}
              components={components}
              className="pdftable"
              style={centeredCellStyle}
            />
          </div>
        ))}

        <div className="pdftravelinfo">
          {/* Cost Includes and Cost Excludes sections */}

          <div>
          <h3> <CropSquareIcon/>&nbsp;&nbsp;Cost Includes</h3>
           <ul>
             <li>Accommodation in the above-mentioned hotel as per Twin sharing.</li>
             <li>Tempo Traveller for Transportation.</li>
             <li>Special Jain Meal made by our Own Chef.</li>
           </ul>
         </div>
 
         <div>
          <h3> <CropSquareIcon/> &nbsp;Cost Excludes</h3>
           <ul>
             <li>Any personal expenses like Laundry, telephone bill, or any other expense ordered directly from the Hotel.</li>
             <li>Any entry fees to Garden, Shikara ride, Gandola fare, Horse expense, and Separate Union Vehicle cost for Pahalgam sightseeing is not included in cost.</li>
             <li>Any Taxes.</li>
             <li>Anything not mentioned in inclusions.</li>
           </ul>
           <p>
             Note: Rooms are subject to availability at the time of booking. Cost is subject to change at the time of booking.
           </p>
         </div>

        </div>
      </main>
    </div>

    </>
  );
};

export default TravelItinerary;
