import React,{useState,useEffect} from 'react';
import axios from 'axios';


//Material Ui Imports
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const RetrieveCourse=(props)=>{

    const x=localStorage.getItem('token');

    const{open,handleClickOpen,handleClose}=props
    console.log(props)
    const {name,description,credit,faculty,cat,building,id}=props.props;

    const [detail,setDetail]=useState({name:name,description:description,credit:credit,faculty:faculty,cat:cat,building:building,id:id})
    console.log(detail.id)
    const [wholeData,setWholeData]=useState();
    
    //Material UI Part
    const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
          
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
        appDetail:{
            background:'linear-gradient(90deg, rgba(236,225,244,1) 19%, rgba(29,253,243,1) 100%, rgba(252,176,69,1) 100%)'
        }
        
        
        
      }));

      const classes = useStyles();
    


    useEffect(()=>{
        function getRetrieveData(){
            axios.get(`http://127.0.0.1:8000/course/course_list/${detail.id}/`,{
                headers:{
                   'Authorization': `token ${x}`,
                }
            }).then((res)=>{
                console.log(res)    
                setWholeData(res.data)
                
            },
            (error)=>{
                console.log('Server Error');
               }
            );
           }
           getRetrieveData();
       },[] )

       return(
        <>
            {/* {bol!=id && <button onClick={()=>handleClickOpen()}> <VisibilityIcon/> </button> }   */}
            {/* <button onClick={handleClickOpen}> <VisibilityIcon/> </button> */}
            
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open full-screen dialog
                </Button> */}
                {/* {bol!=id && <button onClick={()=>setBol(id),handleClickOpen()}> <VisibilityIcon/> </button> }   */}
                {wholeData &&
                <Dialog fullScreen open={open} onClose={handleClose} >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton> */}
                        <Typography variant="h6" className={classes.title}>
                            Course Details
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                    </AppBar>
                    <Divider/>
                    <br></br>
                    <List className={classes.appDetail}>
                    <ListItem button >
                        <ListItemText primary="Course Name" secondary={detail.name} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Description" secondary={detail.description} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Credit" secondary={detail.credit} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Faculty Name:" secondary={wholeData[1][0].name} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Category:" secondary={wholeData[2]&&
                        wholeData[2].map((names)=>{
                            return(
                            <>
                             {names[0].abbreviation }&nbsp;  &nbsp; &nbsp;
                            </>
                            );

                        })
                        } />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Building Name:" secondary={wholeData[0][0].name} />
                    </ListItem>
                    </List>
                </Dialog>
                }
            

        
            {/* {bol!=id && <button onClick={()=>setBol(id)}> <VisibilityIcon/> </button> }   */}
    
            
                
            
    
        </>
            
        );

}

export default RetrieveCourse;