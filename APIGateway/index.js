const express = require('express');
const app = express();
const port = 8090;
const version = '1.0.0';
const bp = require('body-parser');
const apiAdapter = require('./apiAdapter')
// const isAuthorized = require('../controller/requestAuthenticator')

const BASE_URL = 'http://localhost:8080'
const api = apiAdapter(BASE_URL)

// var kafka = require("kafka-node"),
//   Producer = kafka.Producer,
//   client = new kafka.KafkaClient('127.0.0.1:2181'),
//   producer = new Producer(client);

// let count = 0;

// producer.on("ready", function() {
//   console.log("ready");
//   setInterval(function() {
//     payloads = [
//       { topic: "data-retrieval", messages: `I have ${count} cats`, partition: 0, key:"" }
//     ];

//     producer.send(payloads, function(err, data) {
//       console.log(data);
//       count += 1;
//     });
//   }, 5000);
// });

// producer.on("error", function(err) {
//   console.log(err);
// });
router.get('/login', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})
app.listen(port, () => console.log(`Listening on port ${port}`));
