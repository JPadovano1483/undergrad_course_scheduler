import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Paper, Table, TableCell, TableContainer, TableBody, TableRow, Button} from "@mui/material";
import Axios from 'axios';

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
  const requirementRows = (reqs) => {
    console.log(reqs);
    let blocks = [];
    if (reqs.length != 0) {
      for (const element of reqs) {
        blocks.push(
          <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
            <Table aria-label="simple table">
              <TableBody>
                {
                  element.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.course_id}</TableCell>
                      <TableCell>{row.course_name}</TableCell>
                      <TableCell>{row.credit_num}</TableCell>
                      <TableCell>{row.grade}</TableCell>
                    </TableRow>
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
              {requirementRows(handleRequirements(requirements))}
            </div>
        </div >
    );
}

export default Requirements;