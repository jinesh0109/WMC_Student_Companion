import axios from 'axios';
import React, { useEffect, useState } from 'react';


//Material Ui Imports
import CreateIcon from '@material-ui/icons/Create';

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
import VisibilityIcon from '@material-ui/icons/Visibility';

const RetrieveStudent=(props)=>{


    
    const x=localStorage.getItem('token');

    const[bol,setBol]=useState(0);

    const {user,name,enr_num,course,id,program}=props.props;
    const[detail,setDetail]=useState({
        user:user,
        name:name,
        enr_num:enr_num,
        course:course,
        program:program,
        id:id
    });

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
      
      //retrieve 
        const [open, setOpen] = React.useState(true);

        const handleClickOpen = () => {
        setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);   
            setBol(0);
            setOpen(true);   

        };



    
    return(
        <>
            {/* {bol!=id && <button onClick={()=>setBol(id)}> <VisibilityIcon/></button>}   */}
            <button onClick={()=>setBol(id)}> <VisibilityIcon/></button>
            {bol==id &&(
                <>

            <Dialog fullScreen open={open} onClose={handleClose} >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton> */}
                        <Typography variant="h6" className={classes.title}>
                            Student Details
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
                        <ListItemText primary="Student Name" secondary={detail.name} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Enrollment Number" secondary={detail.enr_num} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Programme" secondary={detail.program} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Courses:" secondary={course&&
                        course.map((names,index)=>{
                            return(
                            <>
                             {names.name}&nbsp;  &nbsp; &nbsp;
                            </>
                            );

                        })
                        } />
                    </ListItem>
                    
                    
                    </List>
                </Dialog>





                </>


            )}

        </>
        
    );
};

export default RetrieveStudent;