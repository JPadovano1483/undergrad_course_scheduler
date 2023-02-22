import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import Navigation from "./navigation";
import "./css/account.css"
import Axios from 'axios';
import { useEffect } from 'react';
import { AccountTree } from '@mui/icons-material';

function Account() {
    const [major, setMajor] = useState("");
    const [concentration, setConcentration] = useState("");
    const [minor, setMinor] = useState("");
    const [password, setPassword] = useState("");

    const handleMajorChange = (event) => {

        setMajor(event.target.value);
    };

    const handleMinorChange = (event) => {

        setMinor(event.target.value);
    };
    const handleConcentrationChange = (event) => {

        setConcentration(event.target.value);
    };

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

    const [accountInfo, setAccountInfo] = useState(() => {
        let loggedInUser = localStorage.getItem("user");
        if (loggedInUser != null) {
            loggedInUser = JSON.parse(loggedInUser);
            return loggedInUser;
        }
        else {
            window.location.href = "http://localhost:3000";
        }
    });

    const getaccountInfo = () => {
        Axios.get(`http://localhost:3001/profile`).then((response) => {
            setAccountInfo(response.data);

        });
    }
    useEffect(() => {
        getaccountInfo();
    }, []);
    console.log(accountInfo);
    //console.log(accountInfo[0].first_name);
    //          console.log(accountInfo[0].last_name);
    //          console.log(accountInfo[0].username);
    //          console.log(accountInfo[0].grade_level);

    let first_name = accountInfo?.first_name;
    let last_name = accountInfo?.last_name;
    let username = accountInfo?.username;
    let grade_level = accountInfo?.grade_level;
    let majorH = accountInfo?.program_name;
    const profileName = first_name?.concat(" ", last_name);
    const firstChar = first_name?.substr(0, 1);
    const secondChar = last_name?.substr(0, 1);
    const profileInitials = firstChar?.concat(secondChar);



    return (
        <>
            <Navigation />
            <div className="profileContainer">
                <form class="mike">
                    <Avatar
                        sx={{ bgcolor: '#D6742A', width: 200, height: 200, fontSize: 100 }}
                    >{profileInitials} </Avatar>

                </form>
                <section class="container">
                    <div class="floatleft">
                        <form>
                            <h2 className='username'> Profile </h2>
                            <h2 className='infoName'> {profileName} </h2>
                            <h2 className='userinfo'> Email </h2>
                            <h2> {username} </h2>
                            <h2 className='userinfo'> Grade Level </h2>
                            <h2> {grade_level} </h2>
                            <h2 className='userinfo'> Major </h2>
                            <h2 className='infoName'> {majorH} </h2>
                            <h2 className='userinfo'> Minor </h2>
                            <h2 className='userinfo'> Concentration </h2>


                        </form>
                    </div>
                    <div class="floatright">
                        <h2 className='account'>Update User Information</h2>

                        <div class="Major"> Select your Major</div>
                        <form class="Move">
                            <select value={major} onChange={handleMajorChange}>
                                <option value="Computer Science">Computer Science</option>
                                <option value="CyberSecurity">CyberSecurity</option>
                                <option value="Criminal Justice">Criminal Justice</option>
                                <option value="Undeclared">Undeclared</option>
                            </select>
                        </form>

                        <div class="Minor"> Select your Minor</div>
                        <form>
                            <select value={minor} onChange={handleMinorChange}>
                                <option value="Spanish">Spanish</option>
                                <option value="Business">Business</option>
                                <option value="Music">Music</option>
                                <option value="None">--No Minor--</option>
                            </select>
                        </form>


                        <div class="Concentration"> Select your Concentration</div>
                        <form>
                            <select value={concentration} onChange={handleConcentrationChange}>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Criminal Justice">Criminal Justice</option>
                                <option value="Undeclared">Undeclared</option>
                                <option value="None">--No Concentration--</option>
                            </select>

                            <h4> Major: {major} </h4>
                            <h4> Minor: {minor} </h4>
                            <h4> Concentration: {concentration} </h4>
                        </form>
                        <TextField
                            sx={{ my: 5, ml: 30 }}
                            label="New Password"
                            id="password"
                            type="password"
                            variant="filled"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />


                    </div>
                </section>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, marginLeft: 80 }}
                    onClick={updateAccount}
                >
                    Update
                </Button>
            </div>
        </>
    )
}
export default Account;