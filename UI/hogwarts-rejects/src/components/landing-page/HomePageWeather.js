import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment-timezone"
import { Row, Col } from "react-bootstrap";
function HomePageWeather(props) {
  const long = "-89";
  const lat = "39";

  const [climate, setClimate] = useState({
  });
  useEffect(() => {
    axios
      .get(
        "/api/climate?lon=" +
          props.long +
          "&lat=" +
          props.lat +
          "&appid=48df9480a2a09854ca753dd0721d3f64"
      )
      .then(function(res) {
        console.log(res.data)
        setClimate({
          long: JSON.stringify(res.data.coord.lon),
          lat: JSON.stringify(res.data.coord.lat),
          weatherid:JSON.stringify(res.data.weather.id),
          weathermain:res.data.weather[0].main,
          weatherdescription:res.data.weather[0].description,
          temp:JSON.stringify(res.data.main.temp),
          pressure:JSON.stringify(res.data.main.pressure),
          humidity:JSON.stringify(res.data.main.humidity),
          temp_min:JSON.stringify(res.data.main.temp_min),
          temp_max:JSON.stringify(res.data.main.temp_max),
          windspeed:JSON.stringify(res.data.wind.speed),
          winddeg:JSON.stringify(res.data.wind.deg),
          country:res.data.sys.country,
          sunrise:JSON.stringify(res.data.sys.sunrise),
          sunset:JSON.stringify(res.data.sys.sunset),
          city:res.data.name,
          dt:JSON.stringify(res.data.dt),
          icon:"http://openweathermap.org/img/wn/".concat(res.data.weather[0].icon,"@2x.png")
        })
      });
  }, []);
  console.log(climate.icon)
  let timesec =new Date(0); 
  timesec.setUTCSeconds(climate.dt)
  const [time,setTime]=useState(JSON.stringify(timesec))
  return (
    <div>
      <Card style={{marginTop:"10vh",width:"60vh",marginLeft:"-4vh"}}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="h4" >
       {climate.city}, {climate.country}
         </Typography>
         <Typography color="textSecondary" gutterBottom variant="h5" component="h3">
         <strong>{climate.weathermain}</strong>
         </Typography>
         <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <img style={{height:"15vh",width:"15vh"}}src={climate.icon} alt="icon"/>
       <h1 style={{display:"inline",fontSize:"7vh",marginLeft:"-2vh",paddingBottom:"1vh",position:"relative"}}>{parseInt(climate.temp-273)}<p style={{display:"inline",fontSize:"2vh",top:"-1.0vh",position:"absolute"}}>&deg;C</p></h1>
        <Typography color="textSecondary" style={{float:"right",marginLeft:"6vh"}} >
          Pressure: {climate.pressure} <br/>
          Humidity: {climate.humidity} <br/>
          Wind: {climate.windspeed} km/h, degrees: {climate.winddeg}&deg;
        </Typography>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
export default HomePageWeather;
