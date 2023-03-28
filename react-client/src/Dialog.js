import * as React from 'react';
import './css/dialog.css'
// import { PropTypes } from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Axios from 'axios';
import { useState, useEffect } from 'react';


import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


function SimpleDialog(props) {
    let accountInfo = {};
    if (localStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else if (sessionStorage.getItem("user") !== null) {
        const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        accountInfo = loggedInUser;
    }
    else {
        window.location.href = "http://localhost:3000";
    }
    console.log(accountInfo);

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const [dialog1, setDialog] = useState([]);
    const setDialog1 = () => {
        Axios.post(`http://localhost:3001/dialog`, {
            userId: accountInfo.user_id
        }).then((response) => {
            setDialog(response.data);
        });
    }
    useEffect(() => {
        setDialog1();
    }, []);

    console.log(dialog1);
    let course_id = dialog1[0]?.course_id;
    let course_name = dialog1?.course_name;
    let course_description = dialog1?.course_description;

    console.log(course_id);
    console.log(course_name);
    console.log(course_description);
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ backgroundColor: '#002856', color: 'white' }}>{dialog1?.course_id} - {dialog1?.course_name}</DialogTitle>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow><h4 id='description'>Course Description: </h4></TableRow>
                        <TableRow>
                            <TableCell>{dialog1?.course_description} </TableCell>
                        </TableRow>
                        <TableRow><h4 id='description'>Prerequisites </h4></TableRow>
                        <TableRow>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    );
}
export default SimpleDialog;