import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import StarsIcon from '@material-ui/icons/Stars';
import axios from 'axios';

export default function SimpleRating(props) {
    const course=props.props
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [id, setid] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
    setid(course.id)
  };

  const handleClose = () => {
    setOpen(false);
    setValue(0);
    setid(0)
  };
  const x=localStorage.getItem('token');
  const postid=course.completedCourse.id
  const post=()=>{
    axios.put(`http://127.0.0.1:8000/person/credit/${postid}/`,{course:course.id,rating:value,completed:course.completedCourse.completed},{
        headers: {
            'Authorization': `token ${x}`,
          }
    }).then((res)=>{
        window.location.reload();
    },(error)=>{
        alert('Invalid credentials');
        console.log(error.message);console.log(error.response);
        
    });
}
  return (
    <div>
        <div>
      <Button aria-label="Rate Course" variant="outlined" color="primary" onClick={handleClickOpen}>
            <StarsIcon />
      </Button>
      
      
      {id==course.id&&
      <Dialog
        open={open}
        
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Rate this Course "+course.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                <Box component="fieldset" mb={3} borderColor="transparent">
                
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue((newValue));
                    console.log(value);
                }}
                />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={post} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
      }
    </div>
      
      
    </div>
  );
}
