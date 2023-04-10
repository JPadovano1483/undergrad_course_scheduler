import * as React from 'react';
import './css/dialog.css'
// import { PropTypes } from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Axios from 'axios';
import { useState, useEffect } from 'react';


import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


function SimpleDialog(props) {

    const { onClose, selectedValue, open } = props;
    const row = props.row;
    console.log(props.row);
    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ backgroundColor: '#002856', color: 'white' }}>{row?.course_id} - {row?.course_name}</DialogTitle>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow><h4 id='description'>Course Description: </h4></TableRow>
                        <TableRow>
                            <TableCell>{row?.course_description} </TableCell>
                        </TableRow>
                        <TableRow><h5 id='description'>Prerequisites </h5></TableRow>
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