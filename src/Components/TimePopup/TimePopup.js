import React, { useState } from "react";
import "./TimePopup.css";
// import SearchBar from "../SearchBar";


const TimePopup = ({ closePopup,selectedPlace }) => {
  const [time, setTime] = useState(""); // To store the user's time input

  // Handle form submission

  const placeName=selectedPlace.split(",")[0];
  const handleSubmit = () => {
    if (time) {
      alert(`You added: ${time} minutes`); // Replace with your logic
      closePopup(); // Close the popup
    } else {
      alert("Please enter a valid time!");
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
