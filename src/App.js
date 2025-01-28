import React from "react";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color:"#4e4242"}}>
      <h1>   Welcome to ExploreEase!   </h1>
      <br></br>
      <h2>Search for a Place</h2>
      <SearchBar/>
    </div>
  );
}

export default App;
