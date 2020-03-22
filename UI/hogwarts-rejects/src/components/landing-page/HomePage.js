import React, { useState, useEffect } from "react";
import LogInBox from "./LogInBox";
import RegisterBox from "./RegisterBox";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import loadingScreen from "../../images/Loading3.gif"
import HomePageWeather from "./HomePageWeather"
import {useSelector} from 'react-redux'
import { geolocated } from "react-geolocated";

function HomePage(props) {
  const isLogged = useSelector(state=>state.isLogged)
  const [long, setLong] = useState(false);
  const [lat, setLat] = useState(false);
  const [showLogin, setShowLogin] = useState(
    true
  );
  const [showRegister, setShowRegister] = useState();
  const hideLogin = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const hideRegister = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(displayLocationInfo);
  // }
  // function displayLocationInfo(position) {
  //   const a = position.coords.longitude;
  //   const b = position.coords.latitude;
  //   setLat(b);
  //   setLong(a);
  //   console.log(`longitude: ${a} | latitude: ${b}`);
  // }

  useEffect(()=>{
    // const a = props.coords.longitude
    // const b = props.coords.latitude
    // setLat(b);
    // setLong(a);
    // console.log(`longitude: ${a} | latitude: ${b}`);
    console.log(props.coords)
   },[props.coords])
 useEffect(()=>{
  console.log(long+lat)
 },[long])
 useEffect(()=>{
  setLat(true)
  setLong(true)
   console.log(isLogged)
   console.log(props.isGeolocationAvailable+" test new module")
  //  console.log(props.coords.longitude+" long test")
 })
  return (
    <div style={{ display: "flex" }}>
          <div className="bg-gradient-default" style={{ height: "100vh", backgroundColor: "#add8e6", width: "60vh",background: "linearGradient(87deg,#172b4d,#1a174d)!important", }}>
          <span className="circle1"></span>
      <span className="circle2"></span>
      <span className="circle3"></span>
      <span className="circle4"></span>
      <span className="circle5"></span>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {showLogin&&<LogInBox hideLogin={hideLogin} />}
        {showRegister&&<RegisterBox hideRegister={hideRegister}/>}
      </ReactCSSTransitionGroup>
      </div>

      <ReactCSSTransitionGroup
      style={{marginLeft:"10vh"}}
        transitionName="homepageLoading"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}
      >

{
long&&lat&&
// props.isGeolocationAvailable&&
<HomePageWeather long={long} lat={lat}/>}
      {
        // !props.isGeolocationAvailable&&
      !long&&!lat&&
      <div><br/><br/><br/><br/><br/><h2 style={{color:"#172b4d",textAlign:"center"}}>Loading your location weather in a Minute </h2> <br/><br/><img src={loadingScreen} style={{width:"70vh",height:"53vh",marginLeft:"12vh"}}/></div>}
      </ReactCSSTransitionGroup>
        </div>
  );
}
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(HomePage);