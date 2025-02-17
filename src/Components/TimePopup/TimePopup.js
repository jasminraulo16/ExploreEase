import React, { useState } from "react";
import "./TimePopup.css";

const TimePopup = ({ closePopup, selectedPlace }) => {
  const [time, setTime] = useState(""); // To store the user's time input
  const [loading, setLoading] = useState(false); // To show loading when fetching coordinates

  const placeName = selectedPlace.trim(); // ✅ Keeps full details
  // Extract city name

  // Function to get latitude & longitude using OpenStreetMap API
  const fetchCoordinates = async (place) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        alert("Could not find location coordinates.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Failed to fetch coordinates.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!time) {
      alert("Please enter a valid time!");
      return;
    }

    setLoading(true); // Show loading state

    const coordinates = await fetchCoordinates(placeName);
    if (!coordinates) {
      setLoading(false);
      return;
    }

    const requestData = {
      name: placeName,
      time: time,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/add_destination/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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

    setLoading(false);
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
          <button onClick={handleSubmit} className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
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
