import './navigation.css'
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import { styled } from "@mui/system";


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
            <BrowserRouter>
                <header id="header" className="fixed-top">
                    <div className="container d-flex align-items-center justify-content-between">
                        <h1 className="logo">Messiah University</h1>
                        <NavigationContainer>
                            <LinksContainer>
                                <Link to="/home">4 Year Plan</Link>
                                <Link to="">Prerequisites</Link>
                                <Link to="">All Courses</Link>
                                <Link to="/admin">Admin</Link>
                            </LinksContainer>
                        </NavigationContainer>
                    </div>
                </header>
                <Outlet />
            </BrowserRouter>
        </>
    );
};
export default Navigation;