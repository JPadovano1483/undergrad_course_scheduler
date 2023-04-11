import Navigation from "./navigation";
import './css/home.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Table, TableCell, TableContainer, TableBody, TableRow, Box, Collapse, IconButton, TableHead } from "@mui/material";
import Axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Tooltip from '@mui/material/Tooltip';

function Requirements() {
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

  const user_id = accountInfo.user_id;

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
    return newRequirements;
  }

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
    let req = props.req;
    return (
      <>
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
          <TableCell>
            {getHeaderIcon(req)}
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            {getHeader(req)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Course ID</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Credits</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  {
                    req.map((row) => (
                      <TableBody>
                        <TableCell align="left">{getIcon(row.course_id)}</TableCell>
                        <TableCell align="left">{row.course_id}</TableCell>
                        <TableCell align="left">{row.course_name}</TableCell>
                        <TableCell align="left">{row.credit_num}</TableCell>
                        <TableCell align="left">{getGrade(row.course_id)}</TableCell>
                      </TableBody>
                    ))
                  }
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  function getHeader(requirement) {
    let requirementType = requirement[0].req_type;
    let requirementNum = requirement[0].req_type_num;

    if (requirementType == 'all') return 'All of the following:';
    else if (requirementType == 'credits' || requirementType == 'courses') return `Choose ${requirementNum} ${requirementType} of the following:`;
    else return '';
  }

  function getHeaderIcon(requirement) {
    console.log(requirement);
    console.log(requirement[0].req_type);
    let plannedCount = 0;
    let inProgressCount = 0;
    let requirementType = requirement[0].req_type;
    let requirementNum = requirement[0].req_type_num;
    
    let creditCount = 0;
    let creditReqCompleted = 0;
    requirement.forEach((item) => {
      let course = userCourses.find(smallerItem => smallerItem.course_id == item.course_id);
      if (course) {
        console.log(course);
        if (course.grade) {
          plannedCount++;
          if (requirementType == "credits") creditReqCompleted += item.credit_num;
        }
        else {
          inProgressCount++;
        }
        if (requirementType == "credits") {
          console.log(item);
          creditCount += item.credit_num;
        }
      }
    });
    let notPlanned = false;
    let inProgress = false;
    console.log(requirement.length);
    if (plannedCount < requirement.length) {
      if (requirementType == "all") {
        if ((inProgressCount + plannedCount) == requirement.length) {
          inProgress = true;
          console.log(inProgress);
        }
        else {
          notPlanned = true;
          console.log(notPlanned);
        }
      }
      else if (requirementType == "credits") {
        console.log("Credits: credCount: " + creditCount + " reqNum: " + requirementNum + " complete: " + creditReqCompleted);
        if (creditCount >= requirementNum && creditReqCompleted < requirementNum) {
            inProgress = true;
        }
        else if (creditCount < requirementNum) {
          notPlanned = true;
        }
      }
      else {
        if ((inProgressCount + plannedCount) >= requirementNum) {
          inProgress = true;
          console.log(inProgress);
        }
        else {
          notPlanned = true;
          console.log(notPlanned);
        }
      }
    }
    if (notPlanned) return (
      <Tooltip title="Incomplete/Unplanned" placement="top" arrow>
        <PanoramaFishEyeIcon sx={{ color: 'red' }}></PanoramaFishEyeIcon>
      </Tooltip>
    );
    else if (inProgress) return (
      <Tooltip title="Planned/In Progress" placement="top" arrow>
        <TrackChangesIcon sx={{ color: 'blue' }}></TrackChangesIcon>
      </Tooltip>
    );
    else return (
      <Tooltip title="Completed" placement="top" arrow>
        <CheckCircleOutlineIcon sx={{ color: 'green' }}></CheckCircleOutlineIcon>
      </Tooltip>
    );
  }

  function getIcon(courseId) {
    let course = userCourses.find(item => item.course_id == courseId);
    if (course) {
      console.log(course);
      if (course.grade != null) {
        return (
          <Tooltip title="Completed" placement="top" arrow>
            <CheckCircleOutlineIcon sx={{ color: 'green' }}></CheckCircleOutlineIcon>
          </Tooltip>
        );
      }
      else {
        return (
          <Tooltip title="Planned/In Progress" placement="top" arrow>
            <TrackChangesIcon sx={{ color: 'blue' }}></TrackChangesIcon>
          </Tooltip>
        );
      }
    }
    else {
      return (
        <Tooltip title="Incomplete/Unplanned" placement="top" arrow>
          <PanoramaFishEyeIcon sx={{ color: 'red' }}></PanoramaFishEyeIcon>
        </Tooltip>
      );
    }
  }

  function getGrade(courseId) {
    let course = userCourses.find(item => item.course_id == courseId);
    return course?.grade;
  }

  return (
    <div className="App">
      <Navigation />
      <div className='contentContainer'>
        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
          <Table aria-label="simple table">
            {/* <TableHead>
                    <TableCell />
                    <TableCell />
                    <TableCell>Course ID:</TableCell>
                    <TableCell>Course Name:</TableCell>
                    <TableCell>Credits:</TableCell>
                    <TableCell>Grade:</TableCell>
                  </TableHead> */}
            <TableBody>
              {handleRequirements(requirements).map((row) => (
                <RequirementRows key={row.course_name} req={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div >
  );
}

export default Requirements;