import React, { useState } from "react";
import "./SearchBar.css";
import TimePopup from "./TimePopup/TimePopup";
import imageTravel from "..Components/src/images/imageTravel.jpg";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // For user input
  const [suggestions, setSuggestions] = useState([]); // For storing API results
  const [showPopup, setShowPopup] = useState(false);

  // Fetch suggestions from OpenStreetMap API
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions if input is too short
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5`
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        console.error("Failed to fetch suggestions");
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input); // Update input state
    fetchSuggestions(input); // Fetch suggestions
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name); // Autofill the clicked suggestion
    setSuggestions([]); 
  };

  return (

     
    <div className="search" >
         style={{
        backgroundImage: `url(${imageTravel})`, // Using the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type a place..."
        className="search-input"
      />
       <button onClick={() => setShowPopup(true)} className="add-button">
        Add
      </button>
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="sub-suggestion">
            {suggestion.display_name}
          </div>
        ))}
      </div>
      {showPopup && <TimePopup closePopup={() => setShowPopup(false)} 
        selectedPlace={query}/>}
    </div>
  );
};

export default SearchBar;
