import * as React from 'react';
import { useState } from 'react';
import {Avatar, Button, TextField} from '@mui/material';
import {Grid, Box,  Typography, Container} from '@mui/material';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import "./css/account.css"


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [grade_level, setGradeLevel] = useState("Firstyear");
  const loginErrorMsg = document.getElementById("login-error-msg");
  const passwordErrorMsg = document.getElementById("password-error-msg");

  const handleGradeChange = (event) => {
   
    setGradeLevel(event.target.value);
   
  };

  const addUser = () => {


    if(email !== "" && first_name !== "" && last_name !== "")
    {
      if(password !== "" && confPassword !== "" && password === confPassword )
        {
        console.log("Adding user.");
        Axios.post(`http://localhost:3001/signup`, {
            email: email,
            password: password,
            confPassword: confPassword,
            first_name: first_name,
            last_name: last_name,
            grade_level: grade_level,
        }).then((response) => {
            console.log(response);
        });
        sessionStorage.setItem("username", email);
        window.location.href = "http://localhost:3000/Program";
      }
      else
      {
        passwordErrorMsg.style.display = 'block';
        loginErrorMsg.style.display = 'none';
      }
    }
    else
    {
      loginErrorMsg.style.display = 'block';

    }
};

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
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }} 
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
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <select id ="dropdownGrade" value={grade_level} onChange={handleGradeChange}>
                  <option value="Firstyear">Firstyear</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
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
              <div id = "password-error-msg">
                 Warning! Passwords do not match
              </div>
              <div id = "login-error-msg">
                 Please fill in every field
              </div>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addUser}
            >
              Sign Up
            </Button> 
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