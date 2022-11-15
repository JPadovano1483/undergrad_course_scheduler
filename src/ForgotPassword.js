import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Reset() {
    const sendEmail = () => {
        const Mailjet = require('node-mailjet');

        const client = Mailjet
            .apiConnect('a4d0148c05371f7107bdd333b86d9797', '3d1fb5bf7ab1b63f9c889840f053e513')

        client
            .post('send', {'version': 'v3.1'})
            .request({ "Messages":[
                {
                "From": {
                    "Email": "andrewcoldsmith@gmail.com",
                    "Name": "Andrew"
                },
                "To": [
                    {
                    "Email": "andrewcoldsmith@gmail.com",
                    "Name": "Andrew"
                    }
                ],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
                }
            ]
            })
            .then(response => {
                console.log('response => ', response.body)
            })
            .catch(err => {
                console.log('error => ', err)
            })
    }

    return (

        <Container component="root"
            sx={{
                backgroundColor: '#002856',
                color: 'black',
            }}>
            <Container maxWidth="xs"
                sx={{
                    backgroundColor: '#002856',
                    color: 'black',
                }}>
                
                <Box className='forgot'
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>

                    <Typography component="h1" variant="h5">
                        Password Assistance
                    </Typography>

                    <Typography component="h3" variant="subtitle1">
                        Please enter the email associated with your account
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 3 }}>
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
                        <Link to="/EmailConfirm">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={sendEmail}
                            >
                                Send Email
                            </Button>
                        </Link>
                        <Link to="/">
                            <Grid item
                                sx={{
                                    color: '#4007a2',
                                    ml: 3
                                }}>
                                Back to Login Page
                            </Grid>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}