import React from 'react';


//components
import AllTask from './ShowTask';
const CompletedTask=(props)=>{
    const taskList=props.props;
    
   const altList= taskList.filter(function(task){
        console.log(task.complete);    
        return (task.complete===true);
      },);

      
      
    return (
        <AllTask props={altList} />
    )
};

export default CompletedTask;