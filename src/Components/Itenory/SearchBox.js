import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PlaceholderImage from '../ItenoryMap/placeholder.png';


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};


export default function SearchBox(props) {
  // const { selectPosition, setSelectPosition } = props;
  const { selectedPlaces, suggestionList, onSelectPlace,setNewPlace,newPlace,handleSaveItenory} = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <OutlinedInput
        style={{ width: "100%" }}
        value={newPlace}
        onChange={(event) => setNewPlace(event.target.value)}
      />
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {/* Display custom places only when searchText has at least one character */}
          {newPlace.length > 0 &&
            suggestionList
              .filter((place) =>
                place.display_name.toLowerCase().includes(newPlace.toLowerCase())
              )
              .map((item) => (
                <div key={item?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                     setNewPlace(item.display_name); 
      
                     // Introduce a delay of 1000 milliseconds (1 second) before calling onSelectPlace
                      setTimeout(() => {
                        onSelectPlace(item);
                      }, 1500);
                    }}
                    
                  >
                    <ListItemIcon>
                      <img
                        src={ PlaceholderImage}
                        alt="Placeholder"
                        style={{ width: 38, height: 38 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name}/>
                  </ListItem>
                  <Divider />  
                </div>
              ))}
        </List>
      </div>
    </div>
  );
  
}
