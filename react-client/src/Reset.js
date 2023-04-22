import * as React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';


export default function SignUp() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  console.log(code);

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const loginErrorMsg = document.getElementById("reset-error-msg");


  const changePassword = () => {
    if (code !== "" && password !== "" && confPassword!=="" && password === confPassword) {
      console.log("Changing password.");
      Axios.post(`http://localhost:3001/reset`, {
        code: code,
        password: password,
        confPassword: confPassword,
      }).then((response) => {
        console.log(response);
        Axios.post(`http://localhost:3001/deleteCode`, {
          code: code,
        }).then((response) => {
            console.log(response);
        });

        window.location.href = "http://localhost:3000";
      });
    }
    else
    {
      loginErrorMsg.style.display = 'block';
    }
  };

  return (
    <Container component="root"
      sx={{
        backgroundColor: '#002856',
        color: 'black',
        mt:5
      }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confPassword"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setConfPassword(e.target.value)
                  }}
                />
              </Grid>
              <div id = "reset-error-msg">
                 Warning! Passwords do not match
              </div>
            </Grid>
            {/* <Link to="/home"> */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={changePassword}
              >
                Submit
              </Button>
            {/* </Link> */}
            <Grid container justifyContent="flex-end">
              <Link to="/">
                <Grid item
                  sx={{ color: '#4007a2' }}>

                  Return to Login

                </Grid>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}