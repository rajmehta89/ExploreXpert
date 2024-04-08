import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import context from '../../Components/ReactContext.js';
import { toast} from 'react-toastify';
import { message } from 'antd';


import {connect} from 'react-redux';
import {setFavPlaces} from '../../Components/Redux_management/actions';
import useStyles from './styles.js';


const mapStateToProps = (state) => ({
  user: state.user,  // Assuming 'user' is a top-level property in your state
});

const mapDispatchToProps = (dispatch) => ({
  setFavPlaces: (user) => dispatch(setFavPlaces(user)),
});



const PlaceDetails = ({ place, selected, refProp,setFavPlaces}) => {

  const { favplaces, setfavplaces}=useContext(context);

  const handleSelectfavPlace = (selectedplace, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(favplaces);
  
    // Check if the selected place already exists in the favorites
    const placeExists = favplaces.some(place => place.location_id === selectedplace.location_id);
  
    if (!placeExists) {
      const updatedData = [...favplaces, selectedplace];
  
      setFavPlaces(updatedData);
      setfavplaces(updatedData);
      toast.success('Added to favourites');
      localStorage.setItem('myplaces', JSON.stringify(updatedData));
    }

    else{
       toast.error("Already added to favourites");
    }

  };
  


   const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://th.bing.com/th/id/OIP.Rrb9g7vA7vQwTUggDXHiOQHaE8?rs=1&pid=ImgDetMain'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        <Button size="small" color="primary" onClick={(event)=>{handleSelectfavPlace(place,event)}}>
        Add TO Favorites
      </Button>
      </CardActions>
    </Card>
  );
};

export default  connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);