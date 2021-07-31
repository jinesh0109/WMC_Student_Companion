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
      <Card style={{backgroundColor:'#F0F8FF'}}>
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
            <br/>
             {`Email: ${email}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
            <br/>
             {`Major:  ${details.program} `}
            </Typography>
          </Box>
        </CardContent>
        
        
      </Card>
  </>
  )
};

export default AccountProfile;