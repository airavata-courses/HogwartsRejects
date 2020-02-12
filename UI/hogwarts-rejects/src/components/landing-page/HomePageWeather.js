import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function HomePageWeather(props) {
  const long = "-89";
  const lat = "39";
  // const climate = {
  //   coord: { lon: -89, lat: 39 },
  //   weather: [
  //     { id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" }
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 276.34,
  //     pressure: 1023,
  //     humidity: 80,
  //     temp_min: 275.15,
  //     temp_max: 277.59,
  //     sea_level: 0,
  //     grnd_level: 0
  //   },
  //   wind: { speed: 2.25, deg: 323 },
  //   clouds: { all: 90 },
  //   dt: 1581468220,
  //   sys: { message: 0, country: "US", sunrise: 1581425569, sunset: 1581463668 },
  //   id: 4238245,
  //   name: "Fayette",
  //   cod: 200
  // };
  const [climate, setClimate] = useState({
  });
  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/climate?lon=" +
          long +
          "&lat=" +
          lat +
          "&appid=48df9480a2a09854ca753dd0721d3f64"
      )
      .then(function(res) {
        console.log(res.data)
        setClimate({
          long: JSON.stringify(res.data.coord.lon),
          lat: JSON.stringify(res.data.coord.lat),
          weatherid:JSON.stringify(res.data.weather.id),
          weathermain:JSON.stringify(res.data.main),
          weatherdescription:JSON.stringify(res.data.weather.description),
          temp:JSON.stringify(res.data.main.temp),
          pressure:JSON.stringify(res.data.main.pressure),
          humidity:JSON.stringify(res.data.main.humidity),
          temp_min:JSON.stringify(res.data.main.temp_min),
          temp_max:JSON.stringify(res.data.main.temp_max),
          windspeed:JSON.stringify(res.data.wind.speed),
          winddeg:JSON.stringify(res.data.wind.deg),
          country:JSON.stringify(res.data.sys.country),
          sunrise:JSON.stringify(res.data.sys.sunrise),
          sunset:JSON.stringify(res.data.sys.sunset),
          city:JSON.stringify(res.data.name),
        })
      });
  }, []);
  return (
    <div>
      <Card >
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
         {climate.city}, {climate.country}
        </Typography>
        <Typography variant="h5" component="h2">
          yo
        </Typography>
        <Typography color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      {/* {tp.coord.lon} */}

    </div>
  );
}
export default HomePageWeather;
