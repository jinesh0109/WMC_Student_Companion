import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
const DeleteStudent=(student)=>{
    
    student=student.props;
    //delete button actions:
    const tok=localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const [deleteAlertId, setDeleteAlertId] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
        
      };
   
    const handleClose = () => {
        setOpen(false);
        setDeleteAlertId(0);
      };
    

    const DeleteStudent=()=>{
        Axios.delete(`http://127.0.0.1:8000/person/student/${deleteAlertId}/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }

          }).then(()=>{window.location.reload();},(error)=>{alert('Delete Unsuccessfull')});
    }
    return (<>


         {/* DELETE BUTTON */}
         <button onClick={()=>{setOpen(true);setDeleteAlertId(student.id)}}><DeleteIcon/>  </button>
            {open&& student.id==deleteAlertId &&
                          
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Student Name: {student.name}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={DeleteStudent} color="primary" autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
            }
        </>)
}
export default DeleteStudent;