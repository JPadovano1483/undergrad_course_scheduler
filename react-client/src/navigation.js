import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import './css/navigation.css'
import { Link } from "react-router-dom";
import { Avatar, AppBar, Toolbar, Typography } from '@mui/material';

function Navigation()
{
    const [accountInfo, setAccountInfo] = useState({});
    const getaccountInfo = () => {
            Axios.get(`http://localhost:3001/profile`).then((response) => {
                setAccountInfo(response.data);
    
            });
    }
            useEffect(() =>{
            getaccountInfo();
            },[]);
    
     let first_name = accountInfo[0]?.first_name;
     let last_name = accountInfo[0]?.last_name;
     const firstChar = first_name?.substr(0, 1);
     const secondChar = last_name?.substr(0, 1);
     const profileInitials = firstChar?.concat(secondChar);


     return (
        <AppBar position="static" sx={{ backgroundColor: '#002856;' }}>
            <Toolbar>
                <Link to="/home" className='link'>4 Year Plan</Link>
                <Link to="/admin" className='link'>Admin</Link>
                <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
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