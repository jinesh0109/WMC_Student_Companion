import React from 'react';
import StudentTakenCourses from './StudentTakenCourses';

//components

const CompletedCourses=(props)=>{
    const studentCourses=props.props;
    const completedCourse=studentCourses;
   console.log(studentCourses);
   const altList= studentCourses.course.filter(function(data){
          
    return (data.completedCourse.completed===true);
  },);
//   const altList= studentCourses.filter(function(data){
          
//     return (
//         data.course.filter(function(course){return(
//             data.completed===true
//         );
//         })
//     );
//   },);
  
      
    return (
        <StudentTakenCourses props={altList}/>
    )
};

export default CompletedCourses;