import './navigation.css'
import { Link, Outlet } from "react-router-dom";
import { styled } from "@mui/system";
import { Avatar } from '@mui/material';


const NavigationContainer = styled('div')({
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});
const LinksContainer = styled('div')({
    display: "flex",
    justifyContent: "space-around",
    gap: 50,
});

const Navigation = () => {
    return (
        < >
            <div className="App">
                <header id="header" className="fixed-top">
                    <div className="main">
                        <h1 className="logo">Messiah University</h1>
                        <NavigationContainer>
                            <LinksContainer>
                                <Link to="/home">4 Year Plan</Link>
                                <Link to="">Prerequisites</Link>
                                <Link to="">All Courses</Link>
                                <Link to="/admin">Admin</Link>
                            </LinksContainer>
                            <Avatar sx={{ bgcolor: '#D6742A' }}>SA</Avatar>
                        </NavigationContainer>
                    </div>
                </header>
            </div>
            <Outlet />
        </>
    );
};
export default Navigation;