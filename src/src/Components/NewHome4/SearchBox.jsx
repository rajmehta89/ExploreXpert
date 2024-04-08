import React, { useEffect, useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = (props) => {
  const { selectPosition, setSelectPosition, setSelectedItem } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputStyle, setInputStyle] = useState({}); // State for input style

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const inputWidth = screenWidth > 880 ? 200 : 270;
      const inputHeight = searchText ? 'auto' : '50px';

      setInputStyle({
        height: inputHeight,
        width: `${inputWidth}px`,
        backgroundColor: 'transparent',
        color: 'black',
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchText]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${NOMINATIM_BASE_URL}&q=${query}&format=json`);
      const data = await response.json();
      setListPlace(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    if (inputValue.length >= 1) {
      handleSearch(inputValue);
      setShowSuggestions(true);
    } else {
      setListPlace([]);
      setShowSuggestions(false);
    }
  };

  const handleOptionClick = (item) => {
    setSelectPosition(item.display_name);
    setSelectedItem(item);
    setSearchText(item.display_name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Place here.."
        value={searchText}
        onChange={handleInputChange}
        className="input-common"
        style={inputStyle} // Apply input style
      />
      {showSuggestions && (
        <ul className="absolute z-50 mt-2 w-full rounded-md border border-solid border-gray-300 bg-white py-2">
          {listPlace.map((item, index) => (
            <li
              key={item.place_id}
              className="flex items-center justify-between px-4 py-2 text-start hover:bg-gray-100 cursor-pointer"
              tabIndex={index}
              role="option"
              onClick={() => handleOptionClick(item)}
            >
              <div className="flex flex-col">
                <span>{item.display_name}</span>
                {item.address && (
                  <span className="text-xs text-gray-600">
                    {item.address.town}, {item.address.state}, {item.address.country}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
