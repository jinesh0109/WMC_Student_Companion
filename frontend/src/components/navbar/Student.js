import React,{useState,useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../App.css';



//components
import StudentProfile from '../dashboard/details/StudentProfile2';
import StudentTakenCourses from '../dashboard/details/StudentTakenCourses';
import Todo from '../ToDo/Todo';
import { red } from '@material-ui/core/colors';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: red[500],
    

    justifyContent:"space-between",

  },
}));

export default function Navbar() {
  const is_student=localStorage.getItem('is_student');
  console.log(is_student);

  //fetching data of present student

  const x=localStorage.getItem('token');
  const[details,setDetails]=useState({
    user:'',
    name:'',
    enr_num:'',
    course:[],
    program:'',
    
});

  useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/person/student/profile/`,{
          headers: {
              'Authorization': `token ${x}`,
            }
      }).then((res)=>{
          console.log(res.data[0]);
          console.log(res);
          if(res.data){
              setDetails(res.data[0]);
              // setDetails((prevVal)=>({...prevVal,[prevVal.course]:res.data[0].course}))
          }
      },(error)=>{
          console.log(error.response);
          console.log(error.request);
          console.log(error.message);

      })
  },[]);
  // //////////////////////////////////



  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const sytleTp={marginRight:100};


  const Logout=()=>{
    localStorage.setItem('token','');
    localStorage.setItem('email','');
    localStorage.setItem('is_student','');
    window.location.replace('/');
  }
  return (
    <div className={classes.root}  >
      <AppBar position="static" style={{ position: "fixed",top: 0    }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
        //   scrollButtons="off"
          aria-label="scrollable prevent tabs example"
         
        >
        
  

          <Tab   style={sytleTp} label="Todo List" icon={<PhoneIcon /> } aria-label="phone" {...a11yProps(0)} />
        
          <Tab style={sytleTp} label="Course" icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
          <Tab style={sytleTp} label="Profile" icon={<PersonPinIcon />} aria-label="person" {...a11yProps(2)} />
          <Tab style={{}} label="Logout" icon={<HelpIcon />} aria-label="help" {...a11yProps(3)} />
          
          {/* <Tab icon={<ShoppingBasket />} aria-label="shopping" {...a11yProps(4)} />
          <Tab icon={<ThumbDown />} aria-label="up" {...a11yProps(5)} />
          <Tab icon={<ThumbUp />} aria-label="down" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel  style={{marginTop:'15%'}}  value={value} index={0}>
      
        <Todo/>
          
        
        
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <br/><br/><br/><br/>
        <StudentTakenCourses props={details}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <br/><br/><br/>

        <StudentProfile props={details}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Logout />
      </TabPanel>
     
    </div>
  );
}
