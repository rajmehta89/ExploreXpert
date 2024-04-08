import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '150px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 90,
  },
  mapContainer: {
    height: '85vh',
    width: '100%',
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': { zIndex: 2 },
    transition: 'transform 0.2s ease-out',
  },
  pointer: {
    cursor: 'pointer',
  },
  
  leafletContainer: {
    height: '100%', // or any other desired height
    width: '100%', // or any other desired width
    position: 'relative', // or 'absolute' depending on your layout
  },
}));