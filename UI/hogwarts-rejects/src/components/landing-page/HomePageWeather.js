import React, { useEffect } from "react";
import axios from "axios";
function HomePageWeather(props) {
  const long = "80";
  const lat = "80";
  useEffect(() => {
    axios
      .get("http://localhost:8085/climate?lon=" + long + "&lat=" + lat)
      .then(function(res) {
        console.log(res);
      });
  });
  return (
    <h1>
      the user is in {props.long} and {props.lat}{" "}
    </h1>
  );
}
export default HomePageWeather;
