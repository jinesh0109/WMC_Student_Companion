import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import moment from 'moment';
const CompleteCourse=(props)=>{
    
    const Course=props.props;
    
    
    const tok=localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [CompleteAlertId, setCompleteAlertId] = React.useState(0);
    

   
   
    const handleClose = () => {
        setOpen(false);
        setCompleteAlertId(0);
      };
    

    const CompleteCourse=()=>{
        Axios.put(`http://127.0.0.1:8000/person/completedcourse/${Course.completedCourse.id}/`,
        {course:Course.id,completed:true}
        ,{
            headers: {
            'Authorization': `token ${tok}`,
           
        }

          }).then(()=>{window.location.reload();},(error)=>{console.log(error.response);
            console.log(error.request);
            console.log(error.message);alert('Confirm Course complete Unsuccessfull');})
    };
    // const classes = useStyles();
    

    return (<>


         
         <Button
                            variant="contained"
                            color="primary"
                        
                            startIcon={<DoneOutlineIcon />}
                            onClick={()=>{setOpen(true);setCompleteAlertId(Course.id)}}
                            disabled={Course.completedCourse.completed}
                        >
                            Complete
                        </Button>
            {open&& Course.id==CompleteAlertId &&
                          
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you Completed it?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Course Name: {Course.name}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={CompleteCourse} color="primary" autoFocus>
                Complete
            </Button>
            </DialogActions>
        </Dialog>
            }
        </>);
}
export default CompleteCourse;