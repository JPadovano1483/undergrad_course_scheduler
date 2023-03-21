import './css/App.css';
import * as React from 'react';
import logo from './images/LogoCheckRound.JPG';
import { Avatar, Button, TextField, FormControlLabel } from '@mui/material';
import { Checkbox, Grid, Box, Typography, Container} from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
// import { connect } from 'react-redux';
//import { connect } from 'react-redux';

export default function SignIn() {
  if (localStorage.getItem("user") !== null) {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/home";
  }
  else if (sessionStorage.getItem("user") !== null) {
    window.location.href = "http://localhost:3000/home";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginErrorMsg = document.getElementById("login-error-msg");

  const [remember, setRemember] = useState(false);

  const login = async e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data[0].username !== undefined) {
        console.log(response.data[0].username);
        console.log(response.data[0].password);
        const userData = response.data[0];
        console.log(userData);
        if (remember) {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
        // window.sessionStorage.setItem("user_id", response.data[0].user_id);
        window.location.href = "http://localhost:3000/home";
      }
      else 
      {
        console.log(response.data)
        loginErrorMsg.style.display = 'block';
  
      }
    });
  }

  return (
    <Container
      sx={{
        backgroundColor: '#002856',
        color: 'black',
      }}>
      <Container component="main" maxWidth="xs"
        sx={{
          color: 'black',
          mt: 5
        }}>

        {/* <CssBaseline /> */}

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <img src={logo} className="App-logo" alt="logo" />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} color="primary" />}
              label="Remember me"
            />
            <div id = "login-error-msg">
                 Warning! Email or password is incorrect
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >

              Sign In
            </Button>


            <Grid>
              <Link to="/ForgotPassword">
                <Grid item xs
                  sx={{ color: '#4007a2', mr: 4 }}
                >

                  Forgot password?

                </Grid>
              </Link>
              <Link to="/SignUp">
                <Grid item xs
                  sx={{ color: '#4007a2' }}
                >

                  Don't have an account?
                  Sign Up

                </Grid>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
