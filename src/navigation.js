import './navigation.css'
import { Link, Outlet } from "react-router-dom";
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
            <NavigationContainer>
                <LinksContainer>
                    <Link to="">4 Year Plan</Link>
                    <Link to="">Prerequisites</Link>
                    <Link to="">All Courses</Link>
                    <Link to="">Admin</Link>
                </LinksContainer>
            </NavigationContainer>
            <Outlet />
        </>
    );
};
export default Navigation;