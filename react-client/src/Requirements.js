import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Table, TableCell, TableContainer, TableBody, TableRow, Box, Collapse, IconButton, Typography} from "@mui/material";
import Axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Requirements() {
  const user_id = JSON.parse(localStorage.getItem("user")).user_id;

  const [requirements, setRequirements] = useState([]);
  const getUserRequirements = () => {
      Axios.post(`http://localhost:3001/userRequirements`, {
          user_id: user_id
      }).then((response) => {
          setRequirements(response.data);
      });
  }
  
  useEffect(() => {
      getUserRequirements();
  }, []);

  const handleRequirements = (requirements) => {
    console.log(requirements);
    let newRequirements = [];
    let currId = null;
    let arrayToPush = [];
    if (requirements.length != 0)
      requirements.forEach((element, index) => {
          if (index != 0) {
              if (element.req_id == currId) {
                  arrayToPush.push(element);
              }
              else {
                  newRequirements.push(arrayToPush);
                  arrayToPush = [];
                  arrayToPush.push(element);
                  currId = element.req_id;
              }
          }
          else {
              currId = element.req_id;
              arrayToPush.push(element);
          }
      });
    // if (newRequirements.length != 0) setRequirements(newRequirements);
    return newRequirements;
  }

  // if (requirements.length != 0) {
  //     handleRequirements(requirements);
  // }

  const [userCourses, setUserCourses] = useState([]);
  const getUserCourses = (user_id) => {
      Axios.post(`http://localhost:3001/allUserCourses`, {
          user_id: user_id
      }).then((response) => {
          setUserCourses(response.data);
      });
  }
  useEffect(() => {
      getUserCourses(user_id);
  }, []);

  console.log(userCourses);

  
  
  // return components for requirement rules
  function RequirementRows(props) {
    const [open, setOpen] = useState(false);
    let reqs = props.reqs;
    console.log(reqs);
    let blocks = [];
    if (reqs.length != 0) {
      for (const element of reqs) {
        blocks.push(
          <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Choose 3 of the following: 
                  </TableCell>
                  <TableCell align="right">{element[0].req_type}</TableCell>
                </TableRow>
                {
                  element.map((row) => (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <TableRow key={row.id}>
                        <TableCell>{row.course_id}</TableCell>
                        <TableCell>{row.course_name}</TableCell>
                        <TableCell>{row.credit_num}</TableCell>
                        <TableCell>{row.grade}</TableCell>
                      </TableRow>
                    </Collapse>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
    }
    return blocks;
  }
  
  return (
        <div className="App">
            <Navigation />
            <div className='contentContainer'>
              {/* {requirementRows(handleRequirements(requirements))} */}
              <RequirementRows reqs={handleRequirements(requirements)} />
            </div>
        </div >
    );
}

export default Requirements;