import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function AverageRating(props) {

  const [value, setValue] = React.useState(props.props);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    < >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.2}
        readOnly 
        
      />
      {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
    </>
  );
}