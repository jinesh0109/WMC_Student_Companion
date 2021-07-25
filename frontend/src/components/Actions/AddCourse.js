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
const AddCourse=()=>{

    // const {heading}=props.props;

    const x=localStorage.getItem('token');
    let history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    
    const[categoryData,setCategoryData]=useState();
    // console.log(categoryData);

    const Checkbox1 = props => (
        <input type="checkbox" {...props} />
      )
    
    const [checkedItems, setCheckedItems] = useState({});
    const handleChange = (event) => {
        
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
  

    const changeDetail=(event)=>{
        
        setDetail((previousVal)=>({...previousVal,[event.target.name]:event.target.value})
            
        )
    };
    const[facultyData,setfacultyData]=useState();
    const[buildingData,setBuildingData]=useState();
    
    const[detail,setDetail]=useState({
        name:'',
        description:'',
        credit:'',
        faculty:1,
        cat:'',
        building:1,

    });


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
    };

    const reDirect =()=>{
        window.location.replace('/home');
    }

    
    useEffect(()=>{
         function getFacultyData(){
              axios.get(`http://127.0.0.1:8000/course/faculty_list/`,{
                 headers:{
                    'Authorization': `token ${x}`,
                 }
             }).then((res)=>{
                 setfacultyData(res.data);
             },
             (error)=>{
                 console.log('Server Error');
                }
             );
            }
            getFacultyData();
        },[] )

        useEffect(()=>{
             function getBuildingData(){
                  axios.get(`http://127.0.0.1:8000/course/building_list/`,{
                     headers:{
                        'Authorization': `token ${x}`,
                     }
                 }).then((res)=>{
                     setBuildingData(res.data);
                 },
                 (error)=>{
                     console.log('Server Error');
                    }
                 );
                }
                getBuildingData();
            },[] )
            
            

            useEffect(()=>{
                 function getCategoryData(){
                     axios.get(`http://127.0.0.1:8000/course/category_list/`,{
                         headers:{
                            'Authorization': `token ${x}`,
                         }
                     }).then((res)=>{
                         setCategoryData(res.data);
                         
                     },
                     (error)=>{
                         console.log('Server Error');
                        }
                     );
                    }
                    getCategoryData();
                },[] )


    
    
    
    const send=()=>{
        const body={ name:detail.name,
                    description:detail.description,credit:detail.credit,faculty:detail.faculty,cat:checkedItems,building:detail.building};
                    // description:detail.description,credit:detail.credit,faculty:detail.faculty,cat:detail.cat,building:detail.building};
                    
        axios.post(`http://127.0.0.1:8000/course/course_list/`,body,{
            headers: {
                'Authorization': `token ${x}`,
              }
           
            
        }).then((res)=>{
            // console.log(res);
            // console.log(checkedItems);
            
                console.log('success... :).');
                window.location.replace('/home');
            
            },(error)=>{
                alert('Please enter valid data');
                
                
                console.log(error.message);console.log(error.response);
                console.log(error.request);
                
            })
    };

    return (
        <>
            

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
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
                <Button onClick={handleClose,reDirect} color="primary">
                    Cancel
                </Button>
                <Button onClick={send} color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>
            
            
        </>
    );
};

export default AddCourse;