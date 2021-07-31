import React , {useState,useEffect} from 'react';
import Axios from 'axios';
import EnrollStudentData from './EnrollStudentData';


//Material Ui
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';


const EnrollStudent=(enrolldata)=>{
    
    const enrolldata1=enrolldata.props;
    const studentdata=enrolldata.props1;
    // console.log(enrolldata1);
    // console.log(studentdata);
    

    //Material Ui Display

    const useStyles = makeStyles((theme) => ({
        
        root: {
            width: '98%',
            display:'flex',
            flexDirection:'column'
          
        },
        heading: {
        fontSize: 19,
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
        //   color: theme.palette.text.secondary,
        },

        accColor:{
            // backgroundColor:'#fffb50',
            // background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(17,255,180,1) 0%, rgba(0,212,255,1) 100%)'
        },
      }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    return setExpanded(isExpanded ? panel : false);
  };
    // const [operner,setoperner]=useState(-1);
    // const [operner1,setoperner1]=useState(-1);
    // const [operner2,setoperner2]=useState(-1);

    // const [delCourse,setDelCourse]=useState(0);

    // const handleClose1 = () => {
    //     setOpen(false);
    //     setDelCourse(0);
    // };


    
        return(
            <>
             
             <h1 style={{textAlign:'center',fontFamily:'cursive',color:'blue',marginLeft:'30%',marginTop:-30,marginRight:'30%',border: '2px solid blue',borderRadius:20
                }}>Course List  </h1>
            <ul>
            {
                
                enrolldata1.map((courses,index)=>{
                    return(
                        <>
                        
                            {
                                <div className={classes.root}  key={courses.id}>
                                <Accordion className={classes.accColor} expanded={expanded === index} onChange={handleChange(index)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography className={classes.heading}>Course Name: {courses.name}</Typography>
                                    <Typography className={classes.secondaryHeading}>Credit: {courses.credit}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                          
                                            <EnrollStudentData props={courses} props1={studentdata}/>
                                       
                                        
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider/>
                                <br/>
                            </div>
                            }


                            
                            
                            
                        </>
                    );
                    
                })
            }
            
            </ul>
            </>
        );
        
    }

export default EnrollStudent;