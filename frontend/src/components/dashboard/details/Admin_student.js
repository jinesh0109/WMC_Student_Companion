import React,{useEffect,useState} from 'react';
import Axios from 'axios';

//components
import RetrieveStudent from '../../Actions/RetrieveStudent';
const   Admin_Student=()=>{
    const [studentList,setStudentList]=useState([]);
    const [listItems,setlistItems]=useState([]);
    const tok=localStorage.getItem('token');
    useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/person/students/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }

          }).then((res)=>{
            // setStudentList(res.data);
            const students=res.data;
            console.log(students);
           setlistItems( students.map((student) =><a href={`http://127.0.0.1:8000/person/student/${student.id}/`} key={student.id}>{student.name+" "+student.enr_num+" "+student.course}</a>));
            console.log(res.data);
        })
        
       
    }, []);
    const addStudent=()=>{
        window.location.replace('/home/addstudent');

    }
    return(
        <>
            <button onClick={addStudent}>Add Student</button>
            <ul>{listItems}</ul>
        </>
    );
};


export default Admin_Student;