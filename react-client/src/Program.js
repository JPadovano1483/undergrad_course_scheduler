import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import "./css/account.css"
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import appendChild from 'react';

export default function Program() {
    const [major, setMajor] = React.useState('Computer and Information Science');
    const [minor, setMinor] = React.useState('Music');
    const [concentration, setConcentration] = React.useState('None');
    const [maj, setMaj] = useState([]);
    const [min, setMin] = useState([]);
    const [concen, setConcen] = useState([]);

 

    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    };
    const handleMinorChange = (event) => {
        setMinor(event.target.value);
    };
    const handleConcentrationChange = (event) => {
        setConcentration(event.target.value);
    };

      const setProgramMajor = () => {
        console.log("Setting majors.");
        Axios.post(`http://localhost:3001/major`, {
            major: major,
        }).then((response) => {
            console.log(response);
            setMaj(response.data);
        });
    }
    const setProgramMinor = () => {
        console.log("Setting minors.");
        Axios.post(`http://localhost:3001/minor`, {
            minor: minor,
        }).then((response) => {
            console.log(response);
            setMin(response.data);
        });
    }
    const setProgramConcentration = () => {
        console.log("Setting Concentrations.");
        Axios.post(`http://localhost:3001/concentration/${major}`, {
            concentration: concentration,
        }).then((response) => {
            console.log(response);
            setConcen(response.data);
        });
    }

    useEffect(() => {
        setProgramMajor();
    }, []);
    useEffect(() => {
        setProgramMinor();
    }, []);
    useEffect(() => {
        setProgramConcentration();
    }, []);
    console.log(maj);
    console.log(min);
    console.log(concen);

    var select1 = document.getElementById("selectMajor");
    for(var i = 0; i < maj.length; i++)
    {
        if(select1.length !== maj.length)
        {
            var els = document.createElement("option");
            els.textContent = maj[i].program_name;
            els.value = maj[i].program_name;
            select1.append(els);
        }
        else
        {

        }

     }
    
     var select = document.getElementById("selectMinor");
     for(var j = 0; j < min.length; j++)
     {
        if(select.length !== min.length)
        {
            var el = document.createElement("option");
            el.textContent = min[j].program_name;
            el.value = min[j].program_name;
            select.append(el);
        }
        else
        {

        }
      }

      var select2 = document.getElementById("selectConcentration");
      for(var k = 0; k < concen.length; k++)
      {
        if(select2.length !== concen.length)
        {
            var el1 = document.createElement("option");
            el1.textContent = concen[k].program_name;
            el1.value = concen[k].program_name;
            select2.append(el1);
        }
        else
        {
            
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
                        Program Selection
                    </Typography>

                    <Typography component="h3" variant="subtitle1">
                        Please select a program
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <form>
                        <Grid item xs={12}>
                            <div class ="Select"> Select your Major</div>
                            
                                <select id='selectMajor' value={major} onChange={handleMajorChange} >
                                </select>
                               
                                                
                            <div class ="Select"> Select your Minor</div>
                               
                                <select id='selectMinor' value={minor} onChange={handleMinorChange} >
                                </select>
                             
                                                   
                                                
                            <div class ="Select"> Select your Concentration</div>
                            
                                <select id ='selectConcentration' value={concentration} onChange={handleConcentrationChange}>
                                </select>

                                <h4> Major: {major} </h4>
                                <h4> Minor: {minor} </h4>
                                <h4> Concentration: {concentration} </h4>
                                              
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
                        </form>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}