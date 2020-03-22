const express = require("express");
const app = express();
const port = 8090;
const version = "1.0.0";
const bp = require("body-parser");
const apiAdapter = require("./apiAdapter");
const request = require("request");
const cors = require("cors");
const axios = require("axios");
const uuidv4 = require('uuid/v4')
// const isAuthorized = require('../controller/requestAuthenticator')

app.use(bp.json());
app.use(cors());
// const BASE_URL = "http://localhost:8080";
// const api = apiAdapter(BASE_URL);

var kafka = require("kafka-node");

app.post("/dataprocessor", (req, res) => {
  console.log("data modelling api accessed");
  var userName
  // console.log(req.body)
  axios
    .post("http://user-management:3004/verify", {
      jwt: req.body.jwtToken,
    })
    .then(function (response) {
      console.log(response.data.userName);
      userName = response.data.userName

      const jobid = uuidv4();
      console.log(jobid + userName);
      var url = req.body.fileloc;
      console.log("data retrieval req with url " + req.body.fileloc);
      (Producer = kafka.Producer),
        (client = new kafka.KafkaClient({kafkaHost: 'kafka-service:9092'})),
        (producer = new Producer(client));
      let count = 0;

      // producer.on("ready", function() {
      //   let count = 0;

      //   console.log("ready to write message in kafka");
      let msg = {
        jobid: jobid,
        url: url,
        userName: userName,
      }
      payloads = [
        { topic: "user.data_processor.data", messages: JSON.stringify(msg), partition: 0, key: "" }
      ];

      producer.send(payloads, function (err, data) {
        console.log(data);
        count += 1;
      });
      let msgdt = {
        jobID: jobid,
        query: url,
        userName: userName,
        status: "DATA_RETRIEVED"
      }
      payloads = [
        { topic: "user.session_management.data", messages: JSON.stringify(msgdt), partition: 0, key: "" }
      ];

      producer.send(payloads, function (err, data) {
        console.log(data);
        count += 1;
      });
      res.send();
      // });

      producer.on("error", function (err) {
        console.log(err);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

// app.get("/", (req, res) => {
//   console.log("got req11111 empty / test");
// });
app.post("/login", (req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  console.log("user login " + username + password);

  axios
    .post("http://user-management:3004/login", {
      userName: username,
      password: password
    })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.post("/signup", (req, res) => {
  var username = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  console.log("user register " + username + password + name);

  axios
    .post("http://user-management:3004/signup", {
      userName: username,
      password: password,
      name: name,
    })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.get("/logtest", (req, res) => {
  console.log("got req /logtest");
});

app.get("/climate", (req, res) => {
  console.log("climate api hit");
  console.log(req.query.lon + req.query.lat + req.query.appid);
  // request
  // .get('http://localhost:3001:/climate?lon=' + req.query.lon + '&lat=' + req.query.lat + "&appid="+req.query.appid)
  // .on('response', function(response) {
  //   console.log(response.statusCode) // 200
  //   console.log(response.headers['content-type']) // 'image/png'
  // })
  axios
    .get(
      "http://data-retriever:3002/climate?lon=" +
      req.query.lon +
      "&lat=" +
      req.query.lat +
      "&appid=48df9480a2a09854ca753dd0721d3f64"
    )
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    });
});
app.post("/fetchURL", (req, res) => {
  console.log("fetch URL hit");
  var userName
  var jobID = req.body.jobID
  console.log(jobID)
  axios
    .post("http://user-management:3004/verify", {
      jwt: req.body.jwtToken,
    })
    .then(function (response) {
      console.log(response.data.userName);
      userName = response.data.userName
      axios
        .post("http://post-processor:3003/postprocessor/fetchURL", {
          jobID: jobID,
          userName: userName,
        })
        .then(function (respo) {
          console.log(respo.data.hostURL + "fetch url response")
          res.send(respo.data.hostURL)
        })
        .catch(function (response) {
          console.log(response)
        }
        )
    })


})

app.post("/fetchUsers", (req, res) => {
  console.log("fetch jobs hit");
  var userName
  var jobID = req.body.jobID
  console.log(jobID)
  axios
    .post("http://user-management:3004/verify", {
      jwt: req.body.jwtToken,
    })
    .then(function (response) {
      console.log(response.data.userName);
      userName = response.data.userName
      axios
        .post("http://session-management:3001/session/fetchUsers", {
          userName: userName,
        })
        .then(function (respo) {
          console.log(respo.data)
          res.send(respo.data)
        })
        .catch(function (response) {
          console.log(response)
        }
        )
    })


})

app.listen(port, () => console.log(`Listening on port ${port}`));