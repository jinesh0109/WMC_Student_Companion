import React,{useState,useEffect} from 'react';
import axios from 'axios';
import AddCourse from './AddCourse';

//Material Ui
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
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


const UpdateCourse=(props)=>{
    const{open,handleClickOpen,handleClose}=props
    const [bol,setBol]=useState(0);
    const {name,description,credit,faculty,cat,building,id}=props.props;
    const facultyData=props.props1;
    const categoryData=props.props2;
    const buildingData=props.props3;
    
    const [detail,setDetail]=useState({name:name,description:description,credit:credit,faculty:faculty,cat:cat,building:building,id:id})
    
    const [checkedItems, setCheckedItems] = useState({});

    const Checkbox1 = props => (
        <input type="checkbox" {...props} />
      )
    
    const changeDetail=(event)=>{
        
        setDetail((previousVal)=>({...previousVal,[event.target.name]:event.target.value})
        )

        // console.log(detail)
    };
    const handleChange = (event) => {
        
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }


    //Updating Using Material UI
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

    

    const eventCom=()=>{
    
        handleClose();
        window.location.reload()
       
    }
  

    const x=localStorage.getItem('token');

   

    const UpdateFunction=()=>{
        // console.log(detail.id);
        
        axios.put(`http://127.0.0.1:8000/course/course_list/${detail.id}/`,
        {id:detail.id,name:detail.name,description:detail.description,credit:detail.credit,faculty:detail.faculty,cat:checkedItems,building:detail.building},{
            headers: {
                'Authorization': `token ${x}`,
              }
        }).then((res)=>{
            
            // console.log(res.data)
            window.location.reload();
        },(error)=>{
            alert('Invalid credentials hua hai');
            console.log(error.message);console.log(error.response);
            
        });
    }

    return(
    <>
        
         {/* <button onClick={()=>setOpen(true)}> <CreateIcon/> </button>  */}
         
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Course</DialogTitle>
            <DialogContent>
            
            <TextField
                autoFocus margin="dense" id="name" label="Name" type="email" name="name"
                onChange={changeDetail} value={detail.name}
                fullWidth
            />
            <TextField
                autoFocus margin="dense" id="description" label="Description" type="text" name="description"
                onChange={changeDetail} value={detail.description}
                fullWidth
            />
            <TextField
                autoFocus margin="dense" id="credit" label="Credit" type="number" name="credit"
                onChange={changeDetail} value={detail.credit}
                fullWidth
            />
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <FormLabel >Faculty Name:</FormLabel>
                    <Select
                    native
                    id="faculty"
                    name='faculty'
                    onChange={changeDetail} value={detail.faculty}
                    // input={<Input id="demo-dialog-native" />}
                    >
                    
                    {facultyData &&
                        facultyData.map((choice)=>{
                        // console.log(choice.name);
                            return <option key={choice.id} value={choice.id}>{choice.name} </option>
                        })
                    }
                    </Select>
                </FormControl>
            </form>
            
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <FormLabel >Building Name:</FormLabel>
                    <Select
                    native
                    id="building"
                    name="building"
                    onChange={changeDetail} value={detail.building}
                    // input={<Input id="demo-dialog-native" />}
                    >
                    
                    {buildingData &&
                        buildingData.map((choice)=>{
                        // console.log(choice.name);
                            return <option key={choice.id} value={choice.id}>{choice.name} </option>
                        })
                    }
                    </Select>
                </FormControl>
            </form>
            <br></br>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                    <FormGroup aria-label="position" row>
                    {
                        categoryData &&
                        categoryData.map((item)=>{
                            return <div><label key={item.id}>
                                {item.name+" "} 
                               
                                <FormControlLabel
                                control={<Checkbox name={item.id}  value={item.id} checked={checkedItems[item.id]} onChange={handleChange}/>}
                                />
                                
                            </label>
                            </div>
                        })
                    }
                    </FormGroup>
            </FormControl>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={UpdateFunction} color="primary">
                Update
            </Button>
            </DialogActions>
        </Dialog>
        
    </>
        
    );
}


export default UpdateCourse