import * as React from 'react';
import { useState } from 'react';
import {Avatar, Button, TextField} from '@mui/material';
import Navigation from "./navigation";
import "./css/account.css"
import Axios from 'axios';

function Account() {
    const [major, setMajor] = useState("");
    const [concentration, setConcentration] = useState("");
    const [minor, setMinor] = useState("");
    const [password, setPassword] = useState("");

    const updateAccount = () => {
        console.log("Updating user.");
        Axios.post(`http://localhost:3001/account`, {
            major: major,
            concentration: concentration,
            minor: minor,
            password: password,
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <>
            <Navigation />
            <div className="profileContainer">
                <form>
                    <Avatar 
                        sx={{ bgcolor: '#D6742A', width: 200, height: 200, fontSize: 100 }}
                    ></Avatar>
                    <row>
                        <h2 className ='username'>Profile </h2>
                        <h2 className='account'>Update User Information</h2>
                    </row>
                    <row>
                      <h3 className ='infoName'> Jamie Padovano </h3>   
                        <TextField 
                            label="Major" 
                            id="major" 
                            variant="filled" 
                            sx={{ my: 1, width: '10%', marginLeft: 104, marginRight: 4 }}
                            onChange={(e) => {
                                setMajor(e.target.value)
                            }}
                        />
                        <TextField 
                            label="Minor" 
                            id="minor" 
                            variant="filled" 
                            sx={{ my: 1, width: '10%'}}
                            onChange={(e) => {
                                setMinor(e.target.value)
                            }}  
                        />
                    </row>
                    <row>
                        <h3 className= 'infoTest'> Computer and Information Science</h3>
                        <TextField 
                            label="Double Major" 
                            id="major" 
                            variant="filled" 
                            sx={{width: '20%', left: '60%', marginRight: 8 }}
                            onChange={(e) => {
                                setMajor(e.target.value)
                            }} 
                        />
                    </row>
                    <row>
                    <h3 className= 'infoTest'> Computer Science</h3>
                        <TextField 
                            label="Concentration" 
                            id="concentration" 
                            variant="filled" 
                            sx={{ my: 1, width: '20%', left: '60%', marginRight: 8 }}
                            onChange={(e) => {
                                setConcentration(e.target.value)
                            }} 
                        />
                    </row>
                    <row>
                        <TextField 
                            label="New Password" 
                            id="password" 
                            type="password"
                            variant="filled" 
                            sx={{ my: 1, width: '12%', marginLeft: 112, marginRight: 8 }}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} 
                        />
                    </row>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2, marginLeft:70 }}
                        onClick={updateAccount}
                    >
                        Update
                    </Button>
                </form>
                
            </div>
        </>
    )
}
export default Account;