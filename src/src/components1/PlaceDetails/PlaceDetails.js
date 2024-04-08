import React, { useContext } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useMyContext } from '../../Components/ReactContext.js';
import { connect } from 'react-redux';
import { setFavPlaces } from '../../Components/store/actions/userAction.js';
import axios from 'axios'; // Import axios
import useStyles from './styles.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => ({
  user: state.user,  // Assuming 'user' is a top-level property in your state
});

const mapDispatchToProps = (dispatch) => ({
  setFavPlaces: (user) => dispatch(setFavPlaces(user)),
});

const PlaceDetails = ({ place, setFavPlaces }) => {
  const { favplaces, setFavplaces } = useMyContext();
  const classes = useStyles();

  const handleSelectfavPlace = async (selectedplace, event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the selected place already exists in the favorites
    const placeExists = favplaces.some(place => place.location_id === selectedplace.location_id);

    if (!placeExists) {
      // If the place does not exist, add it to the favorites
      const updatedData = [...favplaces, selectedplace];

      // Update state and set to localStorage
      setFavPlaces(updatedData);
      setFavplaces(updatedData); // Corrected line
      try {
        const token = localStorage.getItem("token");

        // Headers containing the JWT token for authentication
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Backend API endpoint URL
        const apiUrl = 'http://localhost:3001/user/api/storeFavPlaces';

        // Making a POST request to the server
        const response = await axios.post(apiUrl, { favoritePlaces: updatedData }, { headers });
        if (response.status === 200) {
          console.log('Data stored successfully!');
          toast.success(`${selectedplace.name} added to Favorite Places`);
          // Navigate to '/MyMap' or do something else
        } else {
          console.error('Failed to store data.');
          toast.error('Failed to store data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      toast.info("Already added to favourites");
      console.log("place is already exists");
    }
  };

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 200 ,fontWeight: "bold"}}
        image={place.photo ? place.photo.images.small.url : 'https://th.bing.com/th/id/OIP.Rrb9g7vA7vQwTUggDXHiOQHaE8?rs=1&pid=ImgDetMain'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="textSecondary">
            <LocationOnIcon /> {place.address}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center" key={award.display_name}>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        <Button size="small" color="primary" onClick={(event) => handleSelectfavPlace(place, event)}>
          Add TO Favorites
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
