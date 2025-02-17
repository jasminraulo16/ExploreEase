// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker issue in React
// import L from "leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const customIcon = new L.Icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const Map = ({ route }) => {
//   const [routeCoordinates, setRouteCoordinates] = useState([]);

//   useEffect(() => {
//     console.log("Received route in Map Component:", route);

//     if (route.length > 1) {
//       const validCoordinates = route
//         .filter((place) => place.lat !== undefined && place.lon !== undefined) // Ensure lat & lng exist
//         .map((place) => [place.lat, place.lon]);

//       if (validCoordinates.length > 1) {
//         setRouteCoordinates(validCoordinates);
//       } else {
//         console.error("Invalid coordinates in route:", route);
//       }
//     }
//   }, [route]);

//   return (
//     <MapContainer
//       center={route.length > 0 ? [route[0].lat, route[0].lon] : [20.2961, 85.8245]} // Default to Odisha
//       zoom={8}
//       style={{ height: "500px", width: "100%" }}
//     >
//       {/* Tile Layer (Map Background) */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//       />

//       {/* Add Markers for Each Place in Route */}
//       {route.map((place, index) =>
//         place.lat !== undefined && place.lon !== undefined ? (
//           <Marker key={index} position={[place.lat, place.lon]} icon={customIcon} />
//         ) : (
//           console.warn("Skipping marker due to invalid coordinates:", place)
//         )
//       )}

//       {/* Draw the optimized route */}
//       {routeCoordinates.length > 1 && <Polyline positions={routeCoordinates} color="blue" />}
//     </MapContainer>
//   );
// };

// export default Map;



import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker issue in React
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map = ({ route }) => {
  const [roadPath, setRoadPath] = useState([]);

  useEffect(() => {
    if (route.length > 1) {
      // Construct OSRM API URL
      const coordinates = route.map((place) => `${place.lon},${place.lat}`).join(";");
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

      fetch(osrmUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("OSRM Response:", data); 
          if (data.routes && data.routes.length > 0) {
            const newPath = data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
            setRoadPath(newPath);
          }
        })
        .catch((error) => console.error("Error fetching OSRM route:", error));
    }
  }, [route]);

  return (
    <MapContainer
      center={route.length > 0 ? [route[0].lat, route[0].lon] : [20.2961, 85.8245]} // Default to Odisha
      zoom={8}
      style={{ height: "500px", width: "100%" }}
    >
      {/* Tile Layer (Map Background) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Add Markers for Each Place in Route */}
      {route.map((place, index) => (
        <Marker key={index} position={[place.lat, place.lon]} icon={customIcon} />
      ))}

      {/* Draw the realistic road route */}
      {roadPath.length > 0 && <Polyline positions={roadPath} color="blue" />}
    </MapContainer>
  );
};

export default Map;
