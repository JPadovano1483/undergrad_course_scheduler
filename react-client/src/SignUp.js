import * as React from 'react';
import { useState } from 'react';
import {Avatar, Button, TextField} from '@mui/material';
import {Grid, Box,  Typography, Container} from '@mui/material';
import {Link} from 'react-router-dom';
import Axios from 'axios';


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const addUser = () => {
      console.log("Adding user.");
      Axios.post(`http://localhost:3001/signup`, {
          email: email,
          password: password,
          confPassword: confPassword,
      }).then((response) => {
          console.log(response);
      });
  }

  return (
    <Container component ="root"
    sx={{
      backgroundColor:'#002856',
      color:'black',
      mt: 5
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Confirm Password"
                  type="password"
                  id="confPassword"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setConfPassword(e.target.value)
                  }} 
                />
              </Grid>
              
            </Grid>
            {/* <Link to ="/home"> */}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addUser}
            >
              Sign Up
            </Button>
            {/* </Link> */}
            <Grid container justifyContent="flex-end">
            <Link to ="/">
              <Grid item
              sx={{color: '#4007a2'}}>
                
                  Already have an account? Sign in
                
              </Grid>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}