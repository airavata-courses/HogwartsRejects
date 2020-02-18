import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

function DataSelection() {
  const isLogged = useSelector(state => state.isLogged);
  const [state, setState] = useState({
    fileloc: "",
    jwtToken: isLogged
  });
  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const startProcess = () => {
    console.log(state.fileloc);
    axios.post("http://localhost:8090/dataRetrieval", state).then(res => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <h1>Select Data for new Activity here</h1>
      <h2>format> YYYY/MM/DD/radarname/filename</h2>
      <TextField
        style={{ width: "60vh" }}
        label="Enter the url from nexrad Data set"
        onChange={handleChange("fileloc")}
      />
      <br />
      <br />
      <Button
        style={{ marginLeft: "55vh" }}
        onClick={startProcess}
        color="primary"
      >
        Start!
      </Button>
    </div>
  );
}
export default DataSelection;
