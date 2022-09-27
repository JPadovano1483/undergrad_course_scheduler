import Navigation from "./navigation";
import './home.css';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';


function Admin() {
    //Course_id
    //course_name
    //course_description
    //credits
    return (
        <>
            <Navigation />
            <div className='contentContainer'>
                <h1>Please enter course information</h1>
                <p style={{ color: 'red' }}>Fields marked with * are required</p>
                <div className="inputContainer">
                    <form>
                        <TextField required label="Course ID" id="courseID" variant="filled" sx={{ my: 1, width: '50%' }} />
                        <TextField required fullWidth label="Name of the Class" id="name" sx={{ my: 1 }} variant="filled" />
                        <TextField required fullWidth label="Course Description" id="description" multiline
                            rows={4} sx={{ my: 1 }} variant="filled" />
                        <TextField required type={'number'} label="Credits" id="credits" sx={{ my: 1, width: '50%' }}
                            InputProps={{ inputProps: { min: 0, max: 10 } }} variant="filled" />
                        <br></br>
                        <Button variant="contained" startIcon={<InputIcon />} sx={{ left: '87%' }}>
                            <input hidden type="submit" value="Submit" />
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>

    );

}
export default Admin;