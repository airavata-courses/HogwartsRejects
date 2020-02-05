import React, { useState, useEffect } from "react";
import LogInBox from './LogInBox'
function HomePage() {
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }
  
  function displayLocationInfo(position) {
     const a =position.coords.longitude;
    const b =position.coords.latitude
  setLat(b)
  setLong(a)
    console.log(`longitude: ${ a } | latitude: ${ b }`);
  }
  return (
    <div style={{display:"flex"}}>
    <LogInBox/>
    <h2>the user is at {long} and {lat}</h2>
    </div>
  );
}

export default HomePage;
