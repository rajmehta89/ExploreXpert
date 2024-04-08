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
  const { selectedPlaces, suggestionList, onSelectPlace, setNewPlace, newPlace, handleSaveItenory } = props;
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputFocus = (event) => {
    setShowSuggestions(!showSuggestions);
  };

  const handleInputChange = (event) => {
    setNewPlace(event.target.value);
    if (event.target.value.length === 0) {
      setShowSuggestions(false); // Hide suggestions when input is empty
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <OutlinedInput
        style={{ width: "100%" }}
        placeholder="Click here to search"
        value={newPlace}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Pass onFocus event handler directly
      />
      {showSuggestions && (
        <div>
          <List component="nav" aria-label="main mailbox folders">
            {/* Display custom places only when searchText has at least one character */}
            {suggestionList
              .filter((place) =>
                place.display_name.toLowerCase().includes(newPlace.toLowerCase())
              )
              .map((item) => (
                <div key={item?.place_id} style={{ fontSize: "14px" }}>
                  <ListItem
                    button
                    style={{ margin: "4px 8px", fontSize: "12px", backgroundColor: '#F6FDC3' }}
                    onClick={(event) => {
                      handleInputFocus(event);
                      setNewPlace(item.display_name);
                      onSelectPlace(item);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={PlaceholderImage}
                        alt="Placeholder"
                        style={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name} style={{ fontSize: "12px" }} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
          </List>
        </div>
      )}
    </div>
  );
}