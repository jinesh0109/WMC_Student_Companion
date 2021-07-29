import React,{useState,useEffect} from 'react';
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
import axios from 'axios';



//components
import Admin_Student from '../dashboard/details/Admin_student';
import Admin_course from '../dashboard/details/Admin_course';
import EnrollStudent from '../Actions/EnrollStudent';

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
    backgroundColor: theme.palette.background.paper,
    

    justifyContent:"space-between",

  },
}));

export default function Navbar() {
  const is_student=localStorage.getItem('is_student');
  // console.log(is_student);
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

  ///course-jinesh
  
  const[listCourses,setListCourses]=useState([])

  const[facultyData,setfacultyData]=useState();
  const[categoryData,setCategoryData]=useState();
  const[buildingData,setBuildingData]=useState();

  const tok=localStorage.getItem('token');
  useEffect(()=>{
      axios.get('http://127.0.0.1:8000/course/course_list/',
      {
          headers: {
          'Authorization': `token ${tok}`,
          }
      }
      ).then((res)=>{
          const courses=res.data[0];
          // console.log(res);
          // console.log('--------------------------------------------');
        
          setListCourses(courses);
          
      });
  },[]);

//Faculty,Building,Category Jinesh

useEffect(()=>{
  function getFacultyData(){
       axios.get(`http://127.0.0.1:8000/course/faculty_list/`,{
          headers:{
             'Authorization': `token ${tok}`,
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
                 'Authorization': `token ${tok}`,
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
                     'Authorization': `token ${tok}`,
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





  //Student-Poojan

  const [listItems,setlistItems]=useState([]);
    
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/person/students/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }

          }).then((res)=>{
            // setStudentList(res.data);
            const students=res.data;
            // console.log(students);
           setlistItems( students);
  
           
          });
            // console.log(res.data);
        }
        
       
    , []);


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
        
  

          <Tab   style={sytleTp} label="Student" icon={<PhoneIcon /> } aria-label="phone" {...a11yProps(0)} />
        
          <Tab style={sytleTp} label="Course" icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
          <Tab style={sytleTp} label="Enroll Student" icon={<PersonPinIcon />} aria-label="person" {...a11yProps(2)} />
          <Tab style={{}} label="Logout" icon={<HelpIcon />} aria-label="help" {...a11yProps(3)} />
          
          {/* <Tab icon={<ShoppingBasket />} aria-label="shopping" {...a11yProps(4)} />
          <Tab icon={<ThumbDown />} aria-label="up" {...a11yProps(5)} />
          <Tab icon={<ThumbUp />} aria-label="down" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>

      <TabPanel  style={{marginTop:'10%'}}  value={value} index={0}>
        {/* { (is_student=='true')?  <></>:<Admin_Student/>  } */}
          <Admin_Student props={listItems}/>
      </TabPanel>

      <TabPanel  style={{marginTop:'9%'}} value={value} index={1}>
        <Admin_course props={listCourses} props1={facultyData} props2={categoryData} props3={buildingData}/>
      </TabPanel>

      <TabPanel  style={{marginTop:'10%'}} value={value} index={2}>
        <EnrollStudent props={listCourses} props1={listItems}/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Logout />
      </TabPanel>
     
    </div>
  );
}
