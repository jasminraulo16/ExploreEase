import React, { useEffect, useState } from "react";
import "./Destinations.css";

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);

    // Fetch destinations from the backend
    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/get_destinations/");
            const data = await response.json();
            setDestinations(data.destinations);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    // Delete a destination
    const deleteDestination = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete_destination/${id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                setDestinations(destinations.filter(dest => dest.id !== id));
            } else {
                console.error("Failed to delete destination");
            }
        } catch (error) {
            console.error("Error deleting destination:", error);
        }
    };

    return (
        <div className="destinations-container">
            <h2>Added Destinations</h2>
            {destinations.length === 0 ? (
                <p>No destinations added yet.</p>
            ) : (
                <ul>
                    {destinations.map(dest => (
                        <li key={dest.id} className="destination-item">
                            <span>{dest.name} - {dest.time} min</span>
                            <button onClick={() => deleteDestination(dest.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Destinations;
