import React from "react";
import SearchBar from "./Components/SearchBar";
import Destinations from "./Components/Places/Destinations";
// import Map from "./Components/Map/Map";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color:"#4e4242"}}>
      <h1>   Welcome to ExploreEase!   </h1>
      <br></br>
      <h2>Search for a Place</h2>
      <SearchBar/>
      <Destinations />
      {/* <Map /> */}
    </div>
  );
}

export default App;
