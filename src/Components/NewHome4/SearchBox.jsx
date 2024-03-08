import React, { useEffect, useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition,selectedItem,setSelectedItem } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  useEffect(()=>{
      setListPlace([]);
  },[searchText]);

  const handleSearch = (query) => {
    const params = {
      q: query,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    // Fetch suggestions only if there is at least one letter
    if (inputValue.length >= 1) {
      handleSearch(inputValue);
    } else {
      setListPlace([]); // Clear the suggestion list if the input is empty
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
           className="searchBox"
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders" style={{color:"white"}}>
          {listPlace.map((item) => (
            <div key={item?.place_id}>
              <ListItem
                button
                onClick={() => {
                  setSelectPosition(item.display_name);
                  setSelectedItem(item);
                  setSearchText(item.display_name);
                }}
              >
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
