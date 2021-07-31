import React ,{useEffect,useState} from 'react'
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteCourse=(deleteData)=>{
    
    const{delCourse,handleClose1,open}=deleteData
    deleteData=deleteData.props;
    // console.log(deleteData);
    const tok=localStorage.getItem('token');
    
    // const [open, setOpen] = React.useState(false);
    // const [delCourse,setDelCourse]=useState(0);

    // const handleClose1 = () => {
    //     setOpen(false);
    //     setDelCourse(0);
    //   };

    const DeleteCourseData=()=>{
        Axios.delete(`http://127.0.0.1:8000/course/course_list/${delCourse}/`,
        {
            headers: {
                'Authorization': `token ${tok}`,
        
            } 
       }).then(()=>
        {
            console.log('Deleted');
            window.location.reload();
        },
        (error)=>{
            alert('Delete Unsccessful!!')
        }
        );
    }
    return(
        <>
            {/* <button onClick={()=>{
                
                console.log(deleteData.id);
                setOpen(true);
                setDelCourse(deleteData.id)
            }}>
                <DeleteIcon/>
            </button> */}

            {open && delCourse==deleteData.id
                && 

            <Dialog
            open={open}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Course Name: {deleteData.name}
                
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose1} color="primary">
                Cancel
            </Button>
            <Button onClick={DeleteCourseData} color="primary" autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
                
            }
        </>
    );

    

}

export default DeleteCourse;