import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Reset() {
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const loginErrorMsg = document.getElementById("reset-error-msg");


    const sendEmail = () => {

        Axios.post(`http://localhost:3001/checkEmail`, {
            email: email,
        }).then((response) => {
            setCheckEmail(response.data[0].username);
            console.log(response.data[0].username);
        });

        if(checkEmail !== "" && checkEmail === email)
        {
        const code = (Math.floor(Math.random() * 90000000) + 10000000).toString();

        Axios.post(`http://localhost:3001/resetCode`, {
            code: code,
            email: email,
        }).then((response) => {
            console.log("code set");
        });

        Axios.post(`http://localhost:3001/email`, {
            code: code,
            email: email,
        }).then((response) => {
            console.log("sent");
        });
        window.location.href = "http://localhost:3000/EmailConfirm";

        }
        else
        {
            loginErrorMsg.style.display = 'block';

        }
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
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} 
                            />
                        </Grid>
                        <div id = "reset-error-msg">
                            Error! Email address not found
                        </div>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={sendEmail}
                            >
                                Send Email
                            </Button>
                        
                        
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