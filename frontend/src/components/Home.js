import { Button } from '@material-ui/core';
import React from 'react';


//components
import StudentDash from './dashboard/Student'
const Home=()=>{
    const Logout=()=>{
        localStorage.setItem('token','');
        localStorage.setItem('email','');
        localStorage.setItem('is_student','');
    }
    return(
        <>
            <Button onClick={Logout}>Logout</Button>
            <h1>Home Page</h1>
            <StudentDash/>
        </>
    );
}


export default Home;