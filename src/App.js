import logo from './MessiahLogo.JPG';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel} from '@mui/material';
import {Checkbox, Grid, Box, Typography, Container} from '@mui/material';
import * as React from 'react';
import {Link} from 'react-router-dom';
import './App.css';


export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component ="root"
    sx={{
      color:'black',
    }}>
      <Container component="main" maxWidth="xs"
      sx={{
        color: 'black',
      }}>

        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <img src={logo} className="App-logo" alt="logo"  />
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Link to="/home"> 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
          
                Sign In
              </Button>
            </Link>
            <Grid container = 'test'>
              <Grid item xs>
                
                  Forgot password?
                
              </Grid>
            
              <Link to ="/SignUp">
                <Grid item xs>
                
                  Don't have an account? Sign Up
               
                </Grid>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Container>
  );
}