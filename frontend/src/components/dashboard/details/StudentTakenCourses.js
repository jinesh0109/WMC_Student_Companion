import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, green, purple, red } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import CompleteCourse from '../../Actions/CompleteCourse'
import Ratings from './Ratings';
import AverageRating from './AverageRating';
import SearchBar from "material-ui-search-bar"; 
import ClearIcon from '@material-ui/icons/Clear';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
// https://material-ui.com/components/cards/
const useStyles = makeStyles((theme) => ({
  root: {
    
    display: 'flex',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent:'center',
    
    

  },
  root2: {
    width: 400,
    margin:30,
    minHeight:400,
    // minHeight:500,
    maxHeight:400,
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'pink',
    overflowY:'auto',
    // background: 'li  near-gradient(90deg, rgba(224,238,174,1) 0%, rgba(70,230,16,1) 51%, rgba(148,233,199,1) 100%)',  

  },
  
  avatarName: {
    backgroundColor: red[500],
  },
  avatarCredit: {
    backgroundColor: blue[500],
  },
  cardHeader:{
    
    width:350,
    // height:100,
    fontWeight: 'bold',
    fontSize:40,
    color:'red',
    alignItems:'center',
    justifyContent:'center',
    // overflowY:'auto',
  },
  desc: {
    height:100,
    width:350,
    // overflow:'scroll',
    overflowY:'auto',
    
  },
  descData: {
    fontWeight: 'bold',
    fontSize:20,
    color:'black',

  },
  textField:{
    width:'100%',
    // background
  }
}));

export default function RecipeReviewCard(props) {
  // console.log(props);
   const details=props.props;
  //  console.log(details);
   
   
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const[seacrchCri,setseacrchCri]=useState(10);
  const [filteredData, setfilteredData] = React.useState(details);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  ///search
  const handleSearch = (event) =>{

    let value = event.target.value.toLowerCase().trim();
    let result = [];
    // console.log(value);
    if(seacrchCri==10){
      result = details.filter((data) => {
        return data.name.toLowerCase().trim().search(value) != -1;
    });
  }
    else if(seacrchCri==20){
      result = details.filter((data) => {
        return data.faculty.name.toLowerCase().trim().search(value) != -1;
    });
    }
    else if(seacrchCri==30){
      result = details.filter((data) => {
        return data.credit == value  || value=='';
    });
    }
    setfilteredData(result);
  }
  const changeCriteria=(event)=>{
    setseacrchCri(event.target.value);
    

  }
  return (
    <>
    <TextField
        variant="standard"
        value={props.value}
        onChange={handleSearch}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
       <FormControl className={classes.formControl}>
        <InputLabel htmlFor="uncontrolled-native"></InputLabel>
        <NativeSelect onChange={changeCriteria} value={seacrchCri}
          
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Course Name</option>
          <option value={20}>Faculty</option>
          <option value={30}>Credit</option>
        </NativeSelect>
        <FormHelperText>Select Criteria</FormHelperText>
      </FormControl>
    
  {/* <SearchBar   onChange={(event) =>handleSearch(event)}/> */}
    <div  className={classes.root}>
    
  
    {filteredData&&filteredData.map((course)=>{
      return(
      <div key={course.id}>
    <Card  className={classes.root2}>
      <CardHeader
      className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatarName}>
            {course.name[0]}
          </Avatar>
        }
        action={
          <Avatar aria-label="recipe" className={classes.avatarCredit}>
            {course.credit}
          </Avatar>
        }
        title={<span className={classes.cardHeader}>{course.name}</span>}
        subheader={ course.faculty!=null&& <span style={{fontSize:20,color:'#00008B'}}>{'Faculty: '+course.faculty.name}</span>}
        
      />
      
      <CardContent>
        <Typography className={classes.desc} variant="body2" color="textSecondary" component="p">
       <span className={classes.descData}> Description</span> <br/>
          <span style={{color:'black',fontSize:15}}>
              {course.description}
          </span>
        </Typography>
      </CardContent>
      
        
        <span>
        &nbsp;&nbsp;&nbsp;&nbsp;<Ratings props={course}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <CompleteCourse props={course}/>
          
              
        </span>
       <br/><br/>
      <div style={{textAlign:'center',fontSize:20}}>
      

        <AverageRating props={(Math.round(course.completedCourse.avgRating * 100) / 100).toFixed(1)}/>
          <br/>
        <span style={{color:'darkblue'}}>Average rating : {(Math.round(course.completedCourse.avgRating * 100) / 100).toFixed(1)}</span>
      </div>
      <br/>
       {
        course&&course.cat&& <div style={{textAlign:"center",color:'black'}}> 
        <span style={{fontWeight:'bold'}}>Categories:</span><br/>
          {course.cat.map((category)=>{
            return <>{(category.abbreviation)}<br/></>
            })
          }
        </div>
        
      }
      <br/>
    </Card>
    </div>
      )
    })
    }
    </div>
    <br/>
    </>
  );
}