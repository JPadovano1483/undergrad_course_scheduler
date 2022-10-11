import * as React from 'react';
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

            <Box
                sx={{
                borderRadius: 5,
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white'
                }}>

                <Typography component="h1" variant="h5"
                sx={{
                    ml:3
                }}
                >
                    Your password reset request has been processed
                </Typography>

                <Typography component="h3" variant= "subtitle1"
                sx={{
                    mb:3, mt:3
                }}
                >
                    Please check your email inbox for a link to reset
                </Typography>

                <Typography component="h4" variant= "body2"
                sx={{

                }}>
                    Warning: if email is not present, please check SPAM
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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