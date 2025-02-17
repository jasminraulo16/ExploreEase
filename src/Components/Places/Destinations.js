import React, { useEffect, useState } from "react";
import "./Destinations.css";
import Map from "../Map/Map";

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [route, setRoute] = useState([]);

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

    const optimizeRoute = async () => {
        const tripDuration = prompt("Enter your trip duration in minutes:");
        if (!tripDuration || isNaN(tripDuration) || tripDuration <= 0) {
            alert("Please enter a valid trip duration.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/optimize_route/?time=${tripDuration}`);
            const data = await response.json();

            if (response.ok) {
                console.log("Optimized Route from API:", data.route);
                setRoute(data.route);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error optimizing route:", error);
        }
    };

    // Debug: Check if route updates correctly
    useEffect(() => {
        console.log("Updated Route State:", route);
    }, [route]);

    return (
        <div className="destinations-container">
            <h2>Added Destinations</h2>
            {destinations.length === 0 ? (
                <p>No destinations added yet.</p>
            ) : (
                <>
                    <ul>
                        {destinations.map(dest => (
                            <li key={dest.id} className="destination-item">
                                <span>{dest.name} - {dest.time} min</span>
                                <button onClick={() => deleteDestination(dest.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={optimizeRoute}>Optimize</button>
                </>
            )}
            
            {route.length > 0 && (
                <div className="optimized-route">
                    <h3>Optimized Route</h3>
                    <ol>
                        {route.map((place, index) => (
                            <li key={place.id}>
                                {index === 0 ? <strong>Start:</strong> : <strong>Stop {index}:</strong>} {place.name}
                            </li>
                        ))}
                    </ol>
                    <Map route={route} />
                </div>
            )}
        </div>
    );
};

export default Destinations;
