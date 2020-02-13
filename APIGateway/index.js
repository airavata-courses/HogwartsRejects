const express = require('express');
const app = express();
const port = 8090;
const version = '1.0.0';
const bp = require('body-parser');
const apiAdapter = require('./apiAdapter')
const request = require('request');
const cors = require('cors')
const axios = require('axios');
// const isAuthorized = require('../controller/requestAuthenticator')
app.use(bp.json());
app.use(cors())
const BASE_URL = 'http://localhost:8080'
const api = apiAdapter(BASE_URL)

var kafka = require("kafka-node")

app.post('/dataRetrieval',(req,res)=>{

  var url=req.body.fileloc

  console.log("data retrieval req with url "+req.body.fileloc)
  
  Producer = kafka.Producer,

  client = new kafka.KafkaClient('127.0.0.1:2181'),
  producer = new Producer(client);
  let count = 0;

producer.on("ready", function() {
  let count = 0;

  console.log("ready to write message in kafka");
  setInterval(function() {
    payloads = [
      { topic: "data-retrieval", messages: url, partition: 0, key:"" }
    ];

    producer.send(payloads, function(err, data) {
      console.log(data);
      count += 1;
    });
  }, 1);
  res.send()
});

producer.on("error", function(err) {
  console.log(err);
});
})  


app.get('/',(req,res)=>{
  console.log("got req11111 empty / test")
})
app.post('/login', (req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  console.log(username+password)
  
  axios
  .post('http://localhost:8084/login',{'userName':username,'password':password})
  .then(function (response) {
    console.log(response.data);
    res.send(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
})
app.get('/logtest',(req,res)=>{
  console.log("got req")
})

app.get('/climate',(req,res)=>{
  console.log(req.query.lon+req.query.lat+req.query.appid)
  // request
  // .get('http://localhost:3001:/climate?lon=' + req.query.lon + '&lat=' + req.query.lat + "&appid="+req.query.appid)
  // .on('response', function(response) {
  //   console.log(response.statusCode) // 200
  //   console.log(response.headers['content-type']) // 'image/png'
  // })
  axios
      .get("http://localhost:3001/climate?lon=" + req.query.lon + "&lat=" + req.query.lat+"&appid=48df9480a2a09854ca753dd0721d3f64")
      .then(function(response) {
        console.log(response.data);
        res.send(response.data);
      });
})
app.listen(port, () => console.log(`Listening on port ${port}`));
