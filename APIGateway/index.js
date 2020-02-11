const express = require('express');
const app = express();
const port = 8090;
const version = '1.0.0';
const bp = require('body-parser');
const apiAdapter = require('./apiAdapter')
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

  console.log(req.body.fileloc)
  
  Producer = kafka.Producer,

  client = new kafka.KafkaClient('127.0.0.1:2181'),
  producer = new Producer(client);
  let count = 0;

producer.on("ready", function() {
  let count = 0;

  console.log("ready");
  setInterval(function() {
    payloads = [
      { topic: "data-retrieval", messages: url, partition: 0, key:"" }
    ];

    producer.send(payloads, function(err, data) {
      console.log(data);
      count += 1;
    });
  }, 5000);
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
app.listen(port, () => console.log(`Listening on port ${port}`));
