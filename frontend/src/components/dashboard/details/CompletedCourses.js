import React from 'react';
import StudentTakenCourses from './StudentTakenCourses';

//components

const CompletedCourses=(props)=>{
    const completedCourses=props.props;
    
   console.log(props);
      
      
    return (
        <StudentTakenCourses props={completedCourses}/>
    )
};

export default CompletedCourses;