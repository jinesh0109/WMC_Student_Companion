

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
    backgroundColor:'pink',
    overflowY:'auto',
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
    fontSize:50,
    color:'orange',
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
        subheader={course.faculty!=null&& <>{'Faculty: '+course.faculty.name}</>}
        
      />
      
      <CardContent>
        <Typography className={classes.desc} variant="body2" color="textSecondary" component="p">
       <span className={classes.descData}> Description</span> <br/>
          {course.description}
        </Typography>
      </CardContent>
      
        
        <Ratings props={course}/>
       <CompleteCourse props={course}/>
        
      
      
    </Card>
    </div>
      )
    })
    }
    </div>
    </>
  );
}