import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import "./css/account.css"
import { Button, TextField } from '@mui/material';
import { Grid, Box, Typography, Container } from '@mui/material';

export default function Program() {
    const [major, setMajor] = React.useState('--Select Major--');
    const [minor, setMinor] = React.useState('--Select Minor--');
    const [concentration, setConcentration] = React.useState('--Select Concentration--');
    const [maj, setMaj] = useState([]);
    const [min, setMin] = useState([]);
    const [concen, setConcen] = useState([]);
    const [majorId, setMajorId] = useState("");
    const [minorId, setMinorId] = useState("");
    const [concentrationId, setConcentrationId] = useState("");
    const [user, setUser] = useState([]);
    const selectErrorMsg = document.getElementById("selection-error-msg");




    let accountInfo = sessionStorage.getItem("username"); 
   

    const userId = () => {
        Axios.post(`http://localhost:3001/userId`, {
            username: accountInfo
        }).then((response) => {
            //console.log(response);
            setUser(response.data);
        });
    }
    let userid = user[0]?.user_id;

    const handleMajorChange = (event) => {
        console.log(major);
        setMajor(event.target.value);
        const programId = event.target.value;
        console.log(programId);
        getmajorId(programId);
 
    };
    const handleMinorChange = (event) => {
        setMinor(event.target.value);
        const programId = event.target.value;
        console.log(programId);
        getminorId(programId);
    };
    const handleConcentrationChange = (event) => {
        setConcentration(event.target.value);
        const programId = event.target.value;
        console.log(programId);
        getconcentrationId(programId);
    };

      const setProgramMajor = () => {
        console.log("Setting majors.");
        Axios.post(`http://localhost:3001/major`, {
        }).then((response) => {
            //console.log(response);
            setMaj(response.data);
        });
    }
    const setProgramMinor = () => {
        console.log("Setting minors.");
        Axios.post(`http://localhost:3001/minor`, {
        }).then((response) => {
            //console.log(response);
            setMin(response.data);
        });
    }
    const setProgramConcentration = () => {
        console.log("Setting Concentrations.");
        Axios.post(`http://localhost:3001/concentration`, {
        }).then((response) => {
            //console.log(response);
            setConcen(response.data);
        });
    }

    const insertProgram = (userid, programId) => {
        Axios.post(`http://localhost:3001/insertUserProgram`, {
            userId: userid,
            programId: programId
        }).then((response) => {
            console.log(response);
        });
    }
    const getmajorId = (major) => {
        Axios.post(`http://localhost:3001/majorId`, {
            major: major
        }).then((response) => {
            console.log(response.data[0]?.program_id);
            console.log(typeof response.data[0]?.program_id);
            setMajorId(response.data[0]?.program_id);
        });
    }
    const getminorId = (minor) => {
        Axios.post(`http://localhost:3001/minorId`, {
            minor: minor
        }).then((response) => {
            console.log(response.data[0]?.program_id);
            console.log(typeof response.data[0]?.program_id);
            setMinorId(response.data[0]?.program_id);
        });
    }
    const getconcentrationId = (concentration) => {
        Axios.post(`http://localhost:3001/concentrationId`, {
            concentration: concentration
        }).then((response) => {
            console.log(response.data[0]?.program_id);
            console.log(typeof response.data[0]?.program_id);
            setConcentrationId(response.data[0]?.program_id);
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
    useEffect(() => {
        userId();
    }, []);

    const handleSubmit = () => {
        if(typeof majorId === 'number' && typeof minorId === 'number' && typeof concentrationId === 'number')
        {
        insertProgram(userid, majorId);
        insertProgram(userid, minorId);
        insertProgram(userid, concentrationId);
        console.log("Programs added");
        window.location.href = "http://localhost:3000/home";
        }
        else
        {
            selectErrorMsg.style.display = 'block';
        }
      };

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
                                <option>--Select Major--</option>
                                </select>
                               
                                                
                            <div class ="Select"> Select your Minor</div>
                               
                                <select id='selectMinor' value={minor} onChange={handleMinorChange} >
                                <option>--Select Minor--</option>
                                </select>
                             
                                                   
                                                
                            <div class ="Select"> Select your Concentration</div>
                            
                                <select id ='selectConcentration' value={concentration} onChange={handleConcentrationChange}>
                                <option>--Select Concentration--</option>
                                </select>
                            <div id = "selection-error-msg">
                                 Please select a major, minor, and concentration
                            </div>   
                        </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                submit
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}