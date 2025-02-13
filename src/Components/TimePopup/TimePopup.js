import React, { useState } from "react";
import "./TimePopup.css";
// import SearchBar from "../SearchBar";


const TimePopup = ({ closePopup,selectedPlace }) => {
  const [time, setTime] = useState(""); // To store the user's time input

  // Handle form submission

  const placeName = selectedPlace.split(",")[0].trim(); // Extract city name
  const handleSubmit = async () => {
    if (!time) {
      alert("Please enter a valid time!");
      return;
    }
  
    const requestData = {
      name: placeName,
      time: time
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/add_destination/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(`${placeName} added successfully!`);
        closePopup();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error adding destination:", error);
      alert("Failed to connect to the server.");
    }
  };
  

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>How much time do you want to spend in {placeName}?</h3>
        <input
          type="number"
          placeholder="Enter the time in minutes"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-input"
        />
        <div className="button-group">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={closePopup} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePopup;
