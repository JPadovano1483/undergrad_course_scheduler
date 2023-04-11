import * as React from 'react';
import './css/dialog.css'
// import { PropTypes } from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ backgroundColor: '#002856', color: 'white' }}>CIS 180 - Introduction to Computer and Information</DialogTitle>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow><h4 id='description'>Course Description: </h4></TableRow>
                        <TableRow>
                            <TableCell>This course provides a unified introduction to the field of Computer and Information Science (CIS).
                                Students will learn fundamental concepts, develop technical and quantitative skills, and explore the application and
                                ethical impact of computing technologies in various contexts,
                                including research, business, service organizations, education and society at large. </TableCell>
                        </TableRow>
                        <TableRow><h4 id='description'>Prerequisites </h4></TableRow>
                        <TableRow>
                            <TableCell>CIS 101 </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    );
}
export default SimpleDialog;