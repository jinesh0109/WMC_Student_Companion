import React,{useEffect,useState} from 'react';
import Axios from 'axios';

//material ui
import CreateIcon from '@material-ui/icons/Create';

import CancelIcon from '@material-ui/icons/Cancel';


//components

import UpdateStudent from '../../Actions/updateStudent';
import DeleteStudent from '../../Actions/DeleteStudent';



const   Admin_Student=(props)=>{
    
    const listItems=props.props;
    const addStudent=()=>{
        window.location.replace('/home/addstudent');

    }

    
    
    return(
        <>
            <button onClick={addStudent}>Add Student</button>
            <ul>{  listItems.map((student)=>{
                return (<>
                        <li  key={student.id}> {student.name+", "+student.enr_num+", "+student.course}</li>
                       <UpdateStudent props={student}/>
                         <DeleteStudent props={student}/>
                        

                        </>
                    )
            
            })
                    }</ul>
        </>
    );
};


export default Admin_Student;