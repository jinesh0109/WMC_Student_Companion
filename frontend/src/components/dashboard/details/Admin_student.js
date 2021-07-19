import React,{useEffect,useState} from 'react';
import Axios from 'axios';

//material ui
import CreateIcon from '@material-ui/icons/Create';

import CancelIcon from '@material-ui/icons/Cancel';


//components

import UpdateStudent from '../../Actions/updateStudent';
import DeleteStudent from '../../Actions/DeleteStudent';



const   Admin_Student=()=>{
    const [studentList,setStudentList]=useState([]);
    const [listItems,setlistItems]=useState([]);
    const tok=localStorage.getItem('token');
    const[bol,setBol]=useState(0);
    
    

   

    useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/person/students/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }

          }).then((res)=>{
            // setStudentList(res.data);
            const students=res.data;
            
           setlistItems( students);
  
           
          });
            // console.log(res.data);
        }
        
       
    , []);
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