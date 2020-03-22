import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function ActivityList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const isLogged = useSelector(state => state.isLogged);

  const [jobID, setJobID] = useState({
    jobID: "",
    jwtToken: isLogged
  });
  const [imageURL, setImageURL] = useState("");
  const [jobs, setJobs] = useState([]);

  const loadImage = id => {
    console.log(id);
    var newID = JSON.parse(JSON.stringify(jobID));
    newID.jobID = id;
    setJobID(newID);
  };
  useEffect(() => {
    console.log(jobID);
    axios.post("/api/fetchURL", jobID).then(res => {
      console.log(res);
      setImageURL(res.data);
      handleOpen();
    });
  }, [jobID]);
  useEffect(() => {
    handleOpen();
  }, [imageURL]);
  const loadJob = () => {
    console.log(jobID.fileloc);
    axios.post("/api/fetchUsers", jobID).then(res => {
      console.log(res.data);
      setJobs(res.data);
    });
  };

  return (
    <div>
      <h1>Hit refresh to update status</h1>
      <br />
      <br />
      {jobs.map((job, i) => (
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Job ID:{job.jobID}
              </Typography>
              <Typography variant="h5" component="h2"></Typography>
              <Typography className={classes.pos} color="textSecondary">
                The Job query you ran:{job.query}
              </Typography>
              <Typography variant="body2" component="p">
                Current status of this job:{job.status}
              </Typography>
              <Typography variant="body2" component="p">
                When you queried this job:{job.queryDate}
              </Typography>
            </CardContent>
            <CardActions>
              {job.status == "MODELING_IN_PROGRESS" && (
                <Button
                  style={{ marginLeft: "55vh" }}
                  onClick={() => {
                    loadImage(job.jobID);
                  }}
                  color="primary"
                >
                  Load this img!
                </Button>
              )}
              {
                job.status != "MODELING_IN_PROGRESS" && (
                  <Tooltip title="The image is not ready">
                    <div>
                  <Button
                  disabled
                    style={{ marginLeft: "55vh" }}
                    onClick={() => {
                      loadImage(job.jobID);
                    }}
                    color="primary"
                  >
                    Load this img!
                  </Button>
                  </div>
                  </Tooltip>

                )}
            </CardActions>
          </Card>
        </div>
      ))}

      <Button style={{ marginLeft: "55vh" }} onClick={loadJob} color="primary">
        Refresh Jobs!
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img
              src={imageURL}
              style={{ width: "100vh", height: "100vh" }}
              alt="alt"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default ActivityList;
