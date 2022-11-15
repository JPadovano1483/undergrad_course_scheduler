import './css/navigation.css'
import { Link } from "react-router-dom";
import { Avatar, AppBar, Toolbar, Typography } from '@mui/material';

export default function Navigation() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#002856;' }}>
            <Toolbar>
                <Link to="/home" className='link'>4 Year Plan</Link>
                <Link to="/admin" className='link'>Admin</Link>
                <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
                <Avatar sx={{ bgcolor: '#D6742A' }} className='accountLink'>
                    <Link to="/account">SA</Link>
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}

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