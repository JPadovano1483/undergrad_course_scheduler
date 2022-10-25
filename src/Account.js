import { Avatar } from "@mui/material";
import Navigation from "./navigation";
import "./account.css"
import { TextField } from "@mui/material";

function Account() {
    return (
        <>
            <Navigation />
            <div className="profileContainer">
                <form>
                    <Avatar sx={{ bgcolor: '#D6742A', width: 200, height: 200, fontSize: 100 }}>SA</Avatar>
                    <row>
                        <TextField disabled label="Name" id="name" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                        <TextField disabled label="Last Name" id="lastName" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                    </row>
                    <row>
                        <TextField disabled label="Major" id="major" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                        <TextField disabled label="Minor" id="minor" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                    </row>
                    <row>
                        <TextField disabled label="Concentration" id="concentration" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                        <TextField disabled label="Classification" id="classification" variant="filled" sx={{ my: 1, width: '40%', marginLeft: 9, marginRight: 8 }} />
                    </row>
                </form>
            </div>
        </>
    )
}
export default Account;