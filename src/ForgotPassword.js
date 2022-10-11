import * as React from 'react';
import {Button, CssBaseline, TextField} from '@mui/material';
import {Grid, Box,  Typography, Container} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Reset(){
 const handleSubmit = (event) => {

 }

return (

    <Container component ="root"
    sx={{
      backgroundColor:'#002856',
      color:'black',
    }}>
        <Container maxWidth="xs"
        sx={{
        backgroundColor:'#002856',
        color:'black',
        }}>
            <CssBaseline/>

            <Box
                sx={{marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
                }}>

                <Typography component="h1" variant="h5">
                    Password Assistance
                </Typography>

                <Typography component="h3" variant= "subtitle1">
                    Please enter the email associated with your account
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Link to ="/EmailConfirm">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Send Email
                    </Button>
                    </Link>
                    <Link to ="/">
                        <Grid item
                            sx={{color: '#4007a2',
                            ml: 3}}>
                        Back to Login Page
                        </Grid>
                    </Link>
                </Box>
            </Box>
        </Container>
    </Container>
);
}