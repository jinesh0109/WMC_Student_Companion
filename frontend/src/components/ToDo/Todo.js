import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// components 
import CompletedTask from './CompletedTask';
import PendingTask from './PendingTask';
import CreateTask from '../Actions/CreateTask';
import ShowTask from './ShowTask';
import '../../App.css';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      
    },
    
  },
  styleh1:{
            textAlign:'center',fontFamily:'cursive',backgroundColor:'yellow',
            
           
            
            
           
            
          }
}));

export default function ContainedButtons(props) {
  const classes = useStyles();
  const [showPage,setShowPage]=useState(0);
  
  const username=props.props;
  const userid=props.userid;

  const[taskList,settaskList]=useState();
  const x=localStorage.getItem('token');
  useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/person/todo/`,{
          headers: {
              'Authorization': `token ${x}`,
            }
      }).then((res)=>{
          settaskList(res.data);
          console.log(res,'----------------');

          
      },(error)=>{
          console.log(error.response);
          console.log(error.request);
          console.log(error.message);

      })
  },[]);


  return (
    <div className="todoH1">
    <h1></h1>
    <h1 style={{color:'black',backgroundColor:'white',marginTop:100}}>  Hello {username},Come on Dude Start Working! Do your Tasks or die!!</h1>
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
      {showPage==0&&<ShowTask props={taskList}/>}
      {showPage==1&&<CreateTask/>}
      {showPage==2&&<PendingTask props={taskList}/>}
      {showPage==3&&<CompletedTask props={taskList}/>}
    </div>
    </div>
  );
}
