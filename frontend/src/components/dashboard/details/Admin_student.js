import React,{useEffect,useState} from 'react';
import Axios from 'axios';
//material ui
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//components
import RetrieveStudent from '../../Actions/RetrieveStudent';
import UpdateStudent1 from '../../Actions/updateStudent';
import axios from 'axios';


const   Admin_Student=()=>{
    const [studentList,setStudentList]=useState([]);
    const [listItems,setlistItems]=useState([]);
    const tok=localStorage.getItem('token');
    const[bol,setBol]=useState(0);
    // Post request for updating student
    

   

    useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/person/students/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }

          }).then((res)=>{
            // setStudentList(res.data);
            const students=res.data;
            
           setlistItems( students);
  
           
          });
            // console.log(res.data);
        }
        
       
    , []);
    const addStudent=()=>{
        window.location.replace('/home/addstudent');

    }

    //delete button actions:
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
    // ()=>{setOpen(true);setDeleteAlertId(student.id)}
    return(
        <>
            <button onClick={addStudent}>Add Student</button>
            <ul>{  listItems.map((student)=>{
                return (<>
                        <li  key={student.id}> {student.name+", "+student.enr_num+", "+student.course}</li>
                        {bol===student.id &&(<> <UpdateStudent1 props={student} /> <button onClick={()=>{setBol(0)}} ><CancelIcon/> </button> </> )}
                        {bol!=student.id && <button onClick={()=>setBol(student.id)}> <CreateIcon/> </button>    }  
                         
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

                        </>
                    )
            
            })
                    }</ul>
        </>
    );
};

// {bol===1 && <UpdateStudent1 props={student} />}<button onClick={updateStudent}> <CreateIcon/> </button>        <button><DeleteIcon/>  </button>
export default Admin_Student;