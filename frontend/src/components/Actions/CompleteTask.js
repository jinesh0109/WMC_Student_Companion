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
const CompleteTask=(props)=>{
    
    const task=props.props;
    
    // task.due_date=moment(task.due_date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss")
    const tok=localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [CompleteAlertId, setCompleteAlertId] = React.useState(0);
    console.log(new Date(task.due_date).toISOString())

   
   
    const handleClose = () => {
        setOpen(false);
        setCompleteAlertId(0);
      };
    

    const CompleteTask=()=>{
        Axios.put(`http://127.0.0.1:8000/person/todo/${task.id}/`,
        {title:task.title,desc:task.desc,due_date:task.due_date,complete:true}
        ,{
            headers: {
            'Authorization': `token ${tok}`,
           
        }

          }).then(()=>{window.location.reload();},(error)=>{console.log(error.response);
            console.log(error.request);
            console.log(error.message);alert('Confirm Task Unsuccessfull');})
    };
    // const classes = useStyles();
    

    return (<>


         <button>
         <Button
                            variant="contained"
                            color="white"
                            
                            startIcon={<DoneOutlineIcon />}
                            onClick={()=>{setOpen(true);setCompleteAlertId(task.id)}}
                            disabled={task.complete}
                        >
                            Complete
                        </Button>
                        </button>
            {open&& task.id==CompleteAlertId &&
                          
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you completed it?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Task Title: {task.title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={CompleteTask} color="primary" autoFocus>
                Complete
            </Button>
            </DialogActions>
        </Dialog>
            }
        </>);
}
export default CompleteTask;