import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import Axios from 'axios';



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
import Alert from '@material-ui/lab/Alert';


import CreateIcon from '@material-ui/icons/Create';

import CancelIcon from '@material-ui/icons/Cancel';

function UpdateStudent1(props) {
    const[bol,setBol]=useState(0);
    console.log(props);
    const {name,enr_num,id,program}=props.props;
    console.log(props.props.id)
    const[detail,changeDetail]=useState({name:name,enr_num:enr_num,id:id,program:program});

    const onDetailChange=(e)=>{
        changeDetail((prevVal)=>({...prevVal,[e.target.name]:e.target.value}))
    };
    const x=localStorage.getItem('token');
    const[progOptions,setProgOptions]=useState([]);
    //fetching Programmes
    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/person/program/`,{
        headers: {
            'Authorization': `token ${x}`,
          }
    }).then((res)=>{
       console.log(res)
        setProgOptions(res.data);
       
        
    },(error)=>{
        console.log('server error');
    });
    
       
    }, [])


    //Display With Material Ui

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
        setBol(0);
        setOpen(true); 
    }



    const post=()=>{
        axios.put(`http://127.0.0.1:8000/person/student/${detail.id}/`,{name:detail.name,enr_num:detail.enr_num,user:detail.id,program:detail.program},{
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
    
    
    
    return(
        <>
              <button onClick={()=>setBol(id)}> <CreateIcon/> </button>    
             {bol===id&&detail &&(
                   <>    

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Student</DialogTitle>
            <DialogContent>
            
            <TextField
                autoFocus margin="dense" id="name" label="Name" type="text" name="name"
                onChange={onDetailChange} value={detail.name}
                fullWidth
            />
            <TextField
                autoFocus margin="dense" id="enr_num" label="enr_num" type="text" name="enr_num"
                onChange={onDetailChange} value={detail.enr_num}
                fullWidth
            />
            
            {/* {detail.program&&<form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <FormLabel >Programme Name:</FormLabel>
                    <Select
                    native
                    id="program"
                    name='program'
                    onChange={onDetailChange} value={detail.program.id}
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
            } */}
        
            
           
            
           
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            {detail.id &&
            <Button onClick={post} color="primary">
                Update
            </Button>
            }
            </DialogActions>
        </Dialog>
        




            {/* <label htmlFor="name" >Name:</label>
            <input name="name" type="text" value={detail.name} onChange={onDetailChange}></input>
            <br/>
            <label htmlFor="enr_num">Enr_num:</label>
            <input name="enr_num" value={detail.enr_num} onChange={onDetailChange} type="text" ></input>
            

            <button onClick={post} >Update</button> 
            <br/>
            <button onClick={()=>{setBol(0)}} ><CancelIcon/> </button>  */}
            </> 
            )
            }
        </>
    );
}

export default UpdateStudent1;