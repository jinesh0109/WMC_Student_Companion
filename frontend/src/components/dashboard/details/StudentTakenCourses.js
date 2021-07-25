

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
import FeedbackIcon from '@material-ui/icons/Feedback';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from 'react-bootstrap/Button';
import StarsIcon from '@material-ui/icons/Stars';
//
import CompleteCourse from '../../Actions/CompleteCourse'
import Ratings from './Ratings';
import AverageRating from './AverageRating';
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
    background: 'linear-gradient(90deg, rgba(224,238,174,1) 0%, rgba(70,230,16,1) 51%, rgba(148,233,199,1) 100%)',  

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
}));

export default function RecipeReviewCard(props) {
  console.log(props);
   const details=props.props;
   console.log(details);
   
   
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    
    <div  className={classes.root}>
    
  
    {details.map((course)=>{
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
      <div style={{textAlign:'center'}}>
        <AverageRating props={course.completedCourse.avgRating}/>
          <br/>
        <span style={{color:'blue'}}>Average rating : {course.completedCourse.avgRating}</span>
      </div>
    </Card>
    </div>
      )
    })
    }
    </div>
    </>
  );
}