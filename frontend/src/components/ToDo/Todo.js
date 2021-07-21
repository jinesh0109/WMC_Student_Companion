import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      
    },
    maginTop:-10,
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary">All Tasks</Button>
      <Button variant="contained" color="primary">
        Create Task
      </Button>
      <Button variant="contained" color="secondary">
        Pending Task
      </Button>
     
      <Button variant="contained" color="primary" >
      Completed Task
      </Button>
    </div>
  );
}
