import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';



export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Link to="/home">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Link>
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