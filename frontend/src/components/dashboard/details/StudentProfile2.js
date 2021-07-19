import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const AccountProfile = (props) => {
  const details=props.props
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const email=localStorage.getItem('email');
    
 return (
    <>
      <Card >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
          
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {details.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
            Enrollment Number:  {`${details.enr_num} `}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
             {`Email: ${email}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
             {`Major:  ${details.program} `}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
  </>
  )
};

export default AccountProfile;