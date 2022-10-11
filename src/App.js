import './App.css';
import * as React from 'react';
import logo from './MessiahLogo.JPG';
import { Avatar, Button, TextField, FormControlLabel } from '@mui/material';
import { Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data[0].username !== undefined) {
        console.log(response.data[0].username);
        console.log(response.data[0].password);
        window.location.href = "http://localhost:3000/home";
      }
      else {
        console.log(response.data);
      }
    });
  }

  return (
    <Container component="root"
      sx={{
        backgroundColor: '#002856',
        color: 'black',
      }}>
      <Container component="main" maxWidth="xs"
        sx={{
          color: 'black',
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >

              Sign In
            </Button>


            <Grid container='test'>
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
