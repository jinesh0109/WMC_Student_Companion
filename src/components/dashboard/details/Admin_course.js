import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import Admin_Student from './Admin_student';
import UpdateCourse from '../../Actions/UpdateCourse';
import DeleteCourse from '../../Actions/DeleteCourse';
import EnrollStudent from '../../Actions/EnrollStudent';
import RetrieveCourse from '../../Actions/RetrieveCourse';


//Material Ui
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
import { createTheme, withStyles,  ThemeProvider } from '@material-ui/core/styles';
import { red ,green} from '@material-ui/core/colors';

const Admin_course=(props)=>{
    const listCourses=props.props;
    const listFaculty1=props.props1;
    const listCategory=props.props2;
    const listBuilding=props.props3;

    // console.log(listCourses)
    // console.log(listCourses.name)
    
    const tok=localStorage.getItem('token');

    const[listFaculty,setListFaculty]=useState()
    
    const [faculty_course,setFaculty_Course]=useState([])
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(red[500]),
          backgroundColor: red[400],
          marginTop:-50,
          marginLeft:40,
          '&:hover': {
            backgroundColor: red[700],
            
          },
        },
      }))(Button);

    //Material Ui Part to showcase the display of students
    const useStyles = makeStyles((theme) => ({
        
        root: {
          width: '100%',
          
        },
        heading: {
          fontSize: 19,
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: 15,
          
        },

        accColor:{
            // backgroundColor:'#fffb50',
            background: 'linear-gradient(90deg, rgba(93,235,48,1) 0%, rgba(252,176,69,1) 100%, rgba(29,253,243,1) 100%)'
        },
      }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    return setExpanded(isExpanded ? panel : false);
  };
    const [operner,setoperner]=useState(-1);
    const [operner1,setoperner1]=useState(-1);
    const [operner2,setoperner2]=useState(-1);

    const [delCourse,setDelCourse]=useState(0);

    const handleClose1 = () => {
        setOpen(false);
        setDelCourse(0);
    };

    
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/course/faculty_list/`,
        {
            headers: {
            'Authorization': `token ${tok}`,
            }
        }
        ).then((res)=>{
            
            const faculties=res.data;
            // console.log(courses[0].faculty);
            // console.log(faculties);
            setListFaculty(()=>faculties)
            
            return faculties

        }).then( (faculties) => {
            // console.log(listFaculty);
            if(listCourses.length!=faculty_course.length&&listCourses&&faculties){
            loop1:
            for (const c in listCourses) {
                loop2:
                for(const f in faculties){
                    if(listCourses[c]['faculty']===faculties[f]['id'])
                    {
                        // console.log(c['faculty']);
                        // faculty_course.push(listFaculty[f]['name']);
                        setFaculty_Course((preValue)=>{
                            return [...preValue,faculties[f]['name']]
                        })
                        // console.log(faculties[f]['name']);
                        
                        
                        break loop2;
                        
                    }
                }
            }
            // console.log(faculty_course)
        }
            
        });
    },[]);


    const addCourse=()=>{
        window.location.replace('/home/addcourse');

    }
//retrieve 
const [open, setOpen] = React.useState(true);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
          setOpen(false);
          setoperner(-1);
          setoperner1(-1);
          setoperner2(-1);
      };

    return(
        <>
            <ColorButton
            
             variant="contained" color="primary" onClick={addCourse}>
                Add Course
            </ColorButton>
            
            

            
            
            {/* <ul>{listCourses}</ul> */}
            {faculty_course&&listFaculty&&listCourses &&(
            <ul>{listCourses.map((courses,index)=>{
                
                return(
                    <>
                            {
                                //courses.name+"  "+ faculty_course[index] +"  "+courses.credit  
                                // courses.name+'  '+courses.faculty[].name+' '+courses.credit
                                <div className={classes.root}  key={courses.id}>
                                    <Accordion className={classes.accColor} expanded={expanded === index} onChange={handleChange(index)}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        >
                                        <Typography className={classes.heading}>Course: {courses.name}</Typography>
                                        <Typography className={classes.secondaryHeading}>Faculty: {faculty_course[index]}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                            <div>
                                                <span>
                                                &nbsp;&nbsp;
                                                <button onClick={(()=>(setoperner(courses.id),handleClickOpen()))}><VisibilityIcon/></button>
                                                {operner==courses.id&&courses&&<RetrieveCourse props={courses} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>}
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                <button onClick={(()=>(setoperner1(courses.id),handleClickOpen()))}><CreateIcon/></button>
                                                {operner1==courses.id&&courses&&<UpdateCourse props={courses} props1={listFaculty1} props2={listCategory} props3={listBuilding} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>}
                                                
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button onClick={(()=>(setoperner2(courses.id),setOpen(true),setDelCourse(courses.id)))} > <DeleteIcon/></button>
                                                {operner2==courses.id && <DeleteCourse props={courses} delCourse={delCourse} handleClose1={handleClose1} open={open}/>}
                                                
                                                
                                                </span>
                                                
                                                
                                                 {/* <DeleteCourse props={courses}/> */}
                                            </div>
                                            <div>
                                            
                                                <Grid container >
                                                    <Grid item>
                                                        <Tooltip disableFocusListener title="View">
                                                        <Button> View</Button>
                                                        </Tooltip>
                                                    </Grid>
                                                
                                                
                                                    <Grid item>
                                                        <Tooltip disableFocusListener title="Update">
                                                        <Button> Update</Button>
                                                        </Tooltip>
                                                    </Grid>
                                                
                                                
                                                    <Grid item>
                                                        <Tooltip disableFocusListener title="Delete">
                                                        <Button> Delete</Button>
                                                        </Tooltip>
                                                    </Grid>
                                                 
                                                </Grid>
                                            </div>
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Divider/>
                                </div>


                            }
                        
                        
                        
                      
                    </>
                );
            })
            }
            </ul>
             )

            }
            
        </>

    );
}

export default Admin_course;

