import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";

//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';



//make user,add that user to student
const AddStudent=()=>{
    const x=localStorage.getItem('token');
    let history = useHistory();

    

    function handleClick() {
        history.push("/home");

    }
    const[progOptions,setProgOptions]=useState([]);
    const[detail,setDetail]=useState({
        email:'',
        password:'',
        name:'',
        enr_num:'',
        program:1,

    });

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        
      }));

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

      const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reDirect =()=>{
        window.location.replace('/home');
    }

    

    //fetching Programmes
    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/person/program/`,{
        headers: {
            'Authorization': `token ${x}`,
          }
    }).then((res)=>{

        setDetail((previousVal)=>({...previousVal,["program"]:res.data[0].id}));
        setProgOptions(res.data);
        
       
        
    },(error)=>{
        console.log('server error');
    });
    
       
    }, [])
    


    const changeDetail=(event)=>{
        
        setDetail((previousVal)=>({...previousVal,[event.target.name]:event.target.value})
            
        )     
    };
    
    
    const send=()=>{
        const body={ email:detail.email,
                            password:detail.password,name:detail.name,enr_num:detail.enr_num};
        axios.post(`http://127.0.0.1:8000/person/register/`,body,{
            headers: {
                'Authorization': `token ${x}`,
              }
           
            
        }).then((res)=>{
            // console.log(res);
            axios.post(`http://127.0.0.1:8000/person/students/`,{
            email:detail.email,
            name:detail.name,
            enr_num:detail.enr_num,
            program:detail.program,
           },{
                headers: {
                    'Authorization': `token ${x}`,
                  }
                 
            }).then((res)=>{
                console.log('success... :).');
                window.location.replace('/home');
            
            },(error)=>{
                // alert('Please enter valid and unique Name & Enr_num');
                console.log(error.message);console.log(error.response);
                console.log(error.request);
                // console.log('Student creation error');
            })
        },(error)=>{
                console.log(error.message);console.log(error.response);
                console.log(error.request);
                alert('Please enter valid and unique Email & Password');
            
        })
    };

    return (
        <>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
                <DialogContent>
                
                <TextField
                    autoFocus margin="dense" id="name" label="Name" type="email" name="name"
                    onChange={changeDetail} value={detail.name}
                    fullWidth
                />
                <TextField
                    autoFocus margin="dense" id="email" label="email" type="email" name="email"
                    onChange={changeDetail} value={detail.email}
                    fullWidth
                />
                <TextField
                    autoFocus margin="dense" id="password" label="password" type="password" name="password"
                    onChange={changeDetail} value={detail.password}
                    fullWidth
                />
                <TextField
                    autoFocus margin="dense" id="enr_num" label="enr_num" type="text" name="enr_num"
                    onChange={changeDetail} value={detail.enr_num}
                    fullWidth
                />
                <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <FormLabel >Programme Name:</FormLabel>
                        <Select
                        native
                        id="program"
                        name='program'
                        onChange={changeDetail} value={detail.program.id}
                        // input={<Input id="demo-dialog-native" />}
                        >
                        
                        {progOptions &&
                         progOptions.map((choice)=>{
                            // console.log(choice.name);
                             return <option key={choice.id} value={choice.id}>{choice.name} </option>
                            })
                        }
                        </Select>
                    </FormControl>
                </form>
           
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose,reDirect} color="primary">
                    Cancel
                </Button>
                <Button onClick={send} color="primary">
                    Confirm Add 
                </Button>
                </DialogActions>
            </Dialog>
            




            

            



          
            
            
        </>
    );
};

export default AddStudent;