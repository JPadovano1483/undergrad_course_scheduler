import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import "./css/account.css"
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Program() {
    const [major, setMajor] = React.useState('Computer Science');
    const [minor, setMinor] = React.useState('Music');
    const [concentration, setConcentration] = React.useState('None');

    const handleMajorChange = (event) => {
   
      setMajor(event.target.value);
     
    };

    const handleMinorChange = (event) => {
   
        setMinor(event.target.value);
       
      };
    const handleConcentrationChange = (event) => {
   
        setConcentration(event.target.value);
       
      };


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
                        Program Selection
                    </Typography>

                    <Typography component="h3" variant="subtitle1">
                        Please select a program
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid item xs={12}>
                        <div class ="Select"> Select your Major</div>
                            <form>
                                    <select value={major} onChange={handleMajorChange}>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="CyberSecurity">CyberSecurity</option>
                                    <option value="Criminal Justice">Criminal Justice</option>
                                    <option value="Undeclared">Undeclared</option>
                                    </select>
                            </form>                   
                                                
                            <div class ="Select"> Select your Minor</div>
                            <form>
                                    <select value={minor} onChange={handleMinorChange}>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Business">Business</option>
                                    <option value="Music">Music</option>
                                    <option value="None">--No Minor--</option>
                                </select>
                                
                            </form>                   
                                                
                            <div class ="Select"> Select your Concentration</div>
                            <form>
                                    <select value={concentration} onChange={handleConcentrationChange}>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="CyberSecurity">CyberSecurity</option>
                                    <option value="Criminal Justice">Criminal Justice</option>
                                    <option value="Undeclared">Undeclared</option>
                                    <option value="None">--No Concentration--</option>
                                </select>

                                <h4> Major: {major} </h4>
                                <h4> Minor: {minor} </h4>
                                <h4> Concentration: {concentration} </h4>
                            </form>                   
                        </Grid>
                        <Link to="/home">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                //onClick={}
                            >
                                submit
                            </Button>
                        </Link>
                        {/* <Link to="/">
                            <Grid item
                                sx={{
                                    color: '#4007a2',
                                    ml: 3
                                }}>
                                Back to Login Page
                            </Grid>
                        </Link> */}
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}