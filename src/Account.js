import { Avatar } from "@mui/material";
import Navigation from "./navigation";
import "./account.css"
import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'


function Account() {
    return (
        <>
            <Navigation />
            <div className="profileContainer">
                <Avatar sx={{ bgcolor: '#D6742A', width: 200, height: 200, fontSize: 100 }}>SA</Avatar>
                <div className="inputContainer">
                    <form>
                        <TextField required label="Course ID" id="courseID" variant="filled" sx={{ my: 1, width: '50%' }} />
                        <TextField required fullWidth label="Name of the Class" id="name" sx={{ my: 1 }} variant="filled" />
                        <TextField required fullWidth label="Course Description" id="description" multiline
                            rows={4} sx={{ my: 1 }} variant="filled" />
                        <TextField required type={'number'} label="Credits" id="credits" sx={{ my: 1, width: '50%' }}
                            InputProps={{ inputProps: { min: 0, max: 10 } }} variant="filled" />
                        <br></br>
                        <h4>Days class will be offered: </h4>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Monday" />
                            <FormControlLabel control={<Checkbox />} label="Tuesday" />
                            <FormControlLabel control={<Checkbox />} label="Wednesday" />
                            <FormControlLabel control={<Checkbox />} label="Thursday" />
                            <FormControlLabel control={<Checkbox />} label="Friday" />
                        </FormGroup>
                        <h6>Time:</h6>
                        <TimeRangePicker clock={null} />
                        <Button variant="contained" startIcon={<InputIcon />} sx={{ left: '87%' }}>
                            <input hidden type="submit" value="Submit" />
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Account;