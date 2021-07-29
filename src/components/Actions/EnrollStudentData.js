import React ,{useState,useEffect} from 'react';
import axios from 'axios';


//Material UI

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

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const EnrollStudentData=(detail)=>{

    const courseDetail=detail.props;
    const studentDetail=detail.props1;
    // console.log(courseDetail);
    // console.log(studentDetail);
    
   

    const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
          },
          secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
          },
          accColor:{

            background:'linear-gradient(90deg, rgba(236,225,244,1) 19%, rgba(29,253,243,1) 100%, rgba(252,176,69,1) 100%)'
        },
      }));

      const [expanded, setExpanded] = React.useState(false);

    
      
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    //   });

    
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const [openDialog, setOpenDial] = React.useState(false);

        const handleClickOpenDialog = () => {
            setOpenDial(true);
        };

        const handleCloseDialog = () => {
            setOpenDial(false);
        };

        const Checkbox1 = props => (
            <input type="checkbox" {...props} />
          )
        
        const [checkedItems, setCheckedItems] = useState({});
        const handleChange = (event) => {
            
            setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });

        }
        const handleChangeAll = (panel) => (event, isExpanded) => {
            return setExpanded(isExpanded ? panel : false);
          };

        //For Checkbox field of all students
        const [checkedAll, setCheckedAll] = useState(false);
        
        const selectAll = (event) => {
            
            setCheckedAll(!checkedAll);
            // setCheckedItems({[studentDetail.map(li => li.id)]:true});
            
            {

            studentDetail.map((li) =>
                {
                    
                    setCheckedItems((checkedItems) => {
                        return {...checkedItems, [li.id] : true}
                    });
                    
                    
                    
                }

                );
            }
            // console.log(checkedItems);
            
           
            
          };
          const deSelectAll=(event)=>{

                setCheckedItems([]);   
          }
          const [enrollDetail,setEnrollDetail]=useState();
          const getId=courseDetail.id;

        useEffect(()=>{
            function getEnrollData(){
                axios.get(`http://127.0.0.1:8000/course/course_list/${getId}/`,{
                    headers:{
                    'Authorization': `token ${x}`,
                    }
                }).then((res)=>{
                    
                    setEnrollDetail(res.data);
                    // console.log(res.data)
                },
                (error)=>{
                    console.log('Server Error');
                }
                );
            }
            getEnrollData();
        },[] )


        const x=localStorage.getItem('token');
        const sendData=()=>{
            
            axios.put(`http://127.0.0.1:8000/course/course_list/${courseDetail.id}/`,
        {id:courseDetail.id,arr:checkedItems,name:courseDetail.name,description:courseDetail.description,credit:courseDetail.credit,faculty:courseDetail.faculty,cat:courseDetail.cat,building:courseDetail.building},{
            headers: {
                'Authorization': `token ${x}`,
              }
        }).then((res)=>{
            // console.log(res);
            window.location.reload();
        },(error)=>{
            alert('Some Students have been enrolled already,Please Select Again');
            console.log(error.response);
            console.log(error.message);
            window.location.reload();
            
        });
        }

    return(
        <>
            
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Enroll Student 
            </Button>
            
            <Dialog fullScreen open={open} onClose={handleClose} >
                <AppBar className={classes.appBar}>
                <Toolbar>

                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Enroll Student
                    </Typography>

                    <Button autoFocus color="inherit" onClick={handleClickOpenDialog}>
                        Add Students
                    </Button>
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Student Enrollment!!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <h4>Are you sure you want to add these students for the {courseDetail.name} Course?</h4>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>{sendData();handleCloseDialog() ;handleClose()}} color="primary" autoFocus>
                            Confirm Add
                            
                        </Button>
                        </DialogActions>
                    </Dialog>

                </Toolbar>
                </AppBar>

                <List>
                <ListItem button>
                    <ListItemText primary="Course Name:" secondary={courseDetail.name} />
                    <ListItemText primary="Faculty Name:" secondary={enrollDetail&&enrollDetail[1]&&enrollDetail[1][0].name} />
                    
                    <ListItemText primary="Category Name:" secondary={enrollDetail&&enrollDetail[2]&&
                        enrollDetail[2].map((names)=>{
                            return(
                            <>
                             {names[0].abbreviation +'  '}
                            </>
                            );

                        })
                        } />
                        {/* <ListItemText primary="Category Name:" secondary={courseDetail&&courseDetail.category&&
                        courseDetail.category[0].name
                        } /> */}
                    <ListItemText primary="Building Name:" secondary={enrollDetail&&enrollDetail[0]&&enrollDetail[0][0].name} />
                    <ListItemText primary="Course Credit:" secondary={courseDetail.credit} />
                                        
                </ListItem>
                <Divider />
                <br></br>
                <Button variant="contained" color="primary" onClick={selectAll}>
                    Select All
                </Button>
                &nbsp;
                <Button variant="contained" color="secondary" onClick={deSelectAll}>
                    Deselect All
                </Button>
                <h1></h1>
                {/* <button onClick={selectAll}>Select All</button>
                <button onClick={deSelectAll}>Deselect All</button> */}
                {/* <ListItem> */}
                { 
                    
                    
                    studentDetail.map((item,index)=>{
                        return(
                            <>
                            
                        
                            
                            <label key={item.id}>
                                
                                <Accordion  className={classes.accColor} expanded={expanded === index} onChange={handleChangeAll(index)}>
                                    <AccordionSummary
                                    
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                        <Typography className={classes.heading}>Student Name:{item.name}</Typography>
                                        
                                        <Typography className={classes.heading}>Enrollment Number: {item.enr_num}
                                        <Checkbox1 name={item.id}  value={item.id} checked={checkedItems[item.id]} onChange={handleChange}/>
                                        </Typography>
                                    </AccordionSummary>
                                    </Accordion>
                                    <Divider/>
                                {/* <Checkbox1 name={item.id}  value={item.id} checked={checkedItems.item&&checkedItems.item.id} onChange={handleChange}/> */}
                                
                            </label>
                            
                            
                            
                            </>
                        );
                    }
                    
                    )
                    
                }

                {/* </ListItem> */}
                </List>
            </Dialog>
    
            
            
    
        </>
    );
}

export default EnrollStudentData;