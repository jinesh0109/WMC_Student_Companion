import React,{useEffect,useState} from 'react';
import Axios from 'axios';
//icons
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

//components
import RetrieveStudent from '../../Actions/RetrieveStudent';
import UpdateStudent1 from '../../Actions/updateStudent';


const   Admin_Student=()=>{
    const [studentList,setStudentList]=useState([]);
    const [listItems,setlistItems]=useState([]);
    const tok=localStorage.getItem('token');
    const[bol,setBol]=useState(0);
    // Post request for updating student
    

    const updateStudent= (e)=>{
         setBol(1);
         console.log(e.target);
    };

    useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/person/students/`,{
            headers: {
            'Authorization': `token ${tok}`,
            }
// asda
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
                        {bol===student.id && <UpdateStudent1 props={student} />}
                        <button onClick={()=>setBol(student.id)}> <CreateIcon/> </button>      
                          <button><DeleteIcon/>  </button>
                        </>
                    )
            
            })
                    }</ul>
        </>
    );
};

// {bol===1 && <UpdateStudent1 props={student} />}<button onClick={updateStudent}> <CreateIcon/> </button>        <button><DeleteIcon/>  </button>
export default Admin_Student;