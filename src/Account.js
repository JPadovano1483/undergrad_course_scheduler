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

    const updateAccount = () => {
        console.log("Updating user.");
        Axios.post(`http://localhost:3001/account`, {
            major: major,
            concentration: concentration,
            minor: minor,
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
                    >SA</Avatar>
                    <row>

                        <h2>jamie_padovano</h2>
                    </row>
                    <row>
                        <TextField 
                            label="Major" 
                            id="major" 
                            variant="filled" 
                            sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }}
                            onChange={(e) => {
                                setMajor(e.target.value)
                            }}
                        />
                        <TextField 
                            label="Minor" 
                            id="minor" 
                            variant="filled" 
                            sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }}
                            onChange={(e) => {
                                setMinor(e.target.value)
                            }}  
                        />
                    </row>
                    <row>
                        <TextField 
                            label="Concentration" 
                            id="concentration" 
                            variant="filled" 
                            sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }}
                            onChange={(e) => {
                                setConcentration(e.target.value)
                            }} 
                        />
                    </row>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
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