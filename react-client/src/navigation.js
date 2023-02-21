import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import './css/navigation.css'
import { Link } from "react-router-dom";
import { Avatar, AppBar, Toolbar, Typography } from '@mui/material';

function Navigation()
{
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
    
    const firstChar = accountInfo.first_name?.substr(0, 1);
    const secondChar = accountInfo.last_name?.substr(0, 1);
    const profileInitials = firstChar?.concat(secondChar);


    return (
        <AppBar position="static" sx={{ backgroundColor: '#002856;' }}>
            <Toolbar>
                <Link to="/home" className='link'>Planning</Link>
                <Link to="/admin" className='link' hidden={!accountInfo.is_admin}>Admin</Link>
                <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
                <Link onClick={() => {localStorage.clear(); window.location.href = "http://localhost:3000";}} className='link'>Logout</Link>
                <Avatar sx={{ bgcolor: '#D6742A' }} className='accountLink'>
                    <Link to="/account">{profileInitials}</Link>
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}
export default Navigation;


// const Navigation = () => {
//     return (
//         < >
//             <div className="App">
//                 <header id="header" className="fixed-top">
//                     <NavigationContainer>
//                         
//                         
//                     </NavigationContainer>
//                 </header>
//             </div>
//             <Outlet />
//         </>
//     );
// };