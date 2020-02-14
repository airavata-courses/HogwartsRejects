import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
function ActivityList(){
    const jwtToken= 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSaXNoYWJoIiwiZXhwIjoxNTgxNjc2OTA0LCJpYXQiOjE1ODE2NDA5MDR9.LXIgbHaiIsQxWdj1ixCzY7_SJYC5iL8yJaQQW_jVtjhsbdmL5Y9HzQ7dC9nW-S7x2xT5Eisk_oMFPVW281XmeA'

    const [jobID, setJobID] = useState({
    jobID: "847d8285-bd6c-4028-94e4-e2a0b45c26ea",
    jwtToken:jwtToken,
  });
  const [imageURL,setImageURL]=useState()
  const [jobs,setJobs]=useState([])

  const loadImage = (id) => {
    console.log(id);
    axios.post("http://localhost:8090/fetchURL", jobID).then(res => {
      console.log(res.data);
      setImageURL(res.data)
    });
  };
  const loadJob = () => {
    console.log(jobID.fileloc);
    axios.post("http://localhost:8090/fetchUsers", jobID).then(res => {
      console.log(res.data);
        setJobs(res.data)
    });
  };
  
    return(
    <div>
        <h1>Hit refresh to update status</h1>
        <br />
        <br />
        {jobs.map((job,i)=><div>
            <p>{job.userName}</p>
            <p>{job.jobID}</p>
            <p>{job.query}</p>
            <p>{job.status}</p>
            <p>{job.queryDate}</p>
            <Button
          style={{ marginLeft: "55vh" }}
          onClick={()=>{loadImage(job.jobID)}}
          color="primary"
        >
          load Jobs!
        </Button>
            </div>
        )}
        <Button
          style={{ marginLeft: "55vh" }}
          onClick={loadImage}
          color="primary"
        >
          Start!
        </Button>
        <Button
          style={{ marginLeft: "55vh" }}
          onClick={loadJob}
          color="primary"
        >
          load Jobs!
        </Button>
        <img src={imageURL} alt="alt"/>
      </div>

    )
}
export default ActivityList