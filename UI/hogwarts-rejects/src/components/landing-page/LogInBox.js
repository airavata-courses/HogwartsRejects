import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GoogleLogin from "react-google-login";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../../actions/index";
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "auto",
    marginTop: "20vh"
  },
  margin: {
    margin: theme.spacing(3),
    background: "white",
    width: "85%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginTop: "2.5%",
    marginBottom: "3.5%"
  },
  pos: {
    marginBottom: 12
  },
  gray: {
    backgroundColor: "#f0f0f0"
  }
}));
function LogInBox(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const responseGoogle = response => {
    console.log(response);
  };
  const responseFacebook = response => {
    console.log(response);
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: ""
  });
  const handleChange = prop => event => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleLogin = event => {
    axios.post("http://localhost:8090/login", user).then(res => {
      if (Object.keys(res.data).length == 0) {
        console.log("error");
      } else {
        console.log(res.data.jwtToken);
        dispatch(logIn(res.data.jwtToken))
        props.history.push("/dashboard")
      }    
    });
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sign in with
          </Typography>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <br />
          <br />
        </CardContent>

        <CardContent className={classes.gray}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Or sign in with Credentials
          </Typography>
          <FormControl className={classes.margin}>
            <Input
              style={{ height: "6vh" }}
              placeholder="Email"
              inputlabel="email"
              id="email"
              value={user.email}
              onChange={handleChange("email")}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon style={{ color: "#A9A9A9", margin: "0.5vh" }} />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <Input
              style={{ height: "6vh" }}
              variant="filled"
              id="standard-adornment-password"
              type={user.showPassword ? "text" : "password"}
              value={user.password}
              placeholder="Password"
              onChange={handleChange("password")}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ color: "#A9A9A9", margin: "0.5vh" }} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {user.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#9494ff",
                paddingTop: "1vh",
                paddingBottom: "1vh"
              }}
              onClick={handleLogin}
            >
              SIGN IN
            </Button>
          </div>
        </CardContent>
      </Card>
      <Typography
        className="createAcchover"
        gutterBottom
        style={{ marginRight: "7vh" }}
        onClick={props.hideLogin}
      >
        Create Account
      </Typography>
    </div>
  );
}

export default withRouter(LogInBox);
