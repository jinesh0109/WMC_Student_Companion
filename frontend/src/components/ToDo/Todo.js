import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// components 
import CompletedTask from '../Actions/CompletedTask';
import PendingTask from '../Actions/PendingTask';
import CreateTask from '../Actions/CreateTask';
import AllTask from '../Actions/AllTask';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      
    },
    
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();
  const [showPage,setShowPage]=useState(0);

  const[taskList,settaskList]=useState();
  const x=localStorage.getItem('token');
  useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/person/todo/`,{
          headers: {
              'Authorization': `token ${x}`,
            }
      }).then((res)=>{
          settaskList(res.data);
          
      },(error)=>{
          console.log(error.response);
          console.log(error.request);
          console.log(error.message);

      })
  },[]);


  return (
    <div className={classes.root}>
      <Button onClick={()=>{setShowPage(0)}} variant="contained" color="secondary">All Tasks</Button>
      <Button onClick={()=>{setShowPage(1)}} variant="contained" color="primary">
        Create Task
      </Button>
      <Button onClick={()=>{setShowPage(2)}} variant="contained" color="secondary">
        Pending Task
      </Button>
     
      <Button onClick={()=>{setShowPage(3)}} variant="contained" color="primary" >
      Completed Task
      </Button>
      <br/>
      {showPage==0&&<AllTask props={taskList}/>}
      {showPage==1&&<CreateTask/>}
      {showPage==2&&<PendingTask/>}
      {showPage==3&&<CompletedTask/>}
    </div>
  );
}
