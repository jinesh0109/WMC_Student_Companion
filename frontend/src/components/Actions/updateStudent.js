import axios from 'axios';
import React, { useState } from 'react';

function UpdateStudent1(props) {
    const {name,enr_num,id}=props.props;
    const[detail,setDetail]=useState({name:name,enr_num:enr_num,id:id});
    const onDetailChange=(e)=>{
        setDetail((prevVal)=>({...prevVal,[e.target.name]:e.target.value}))
    };
    const x=localStorage.getItem('token');
    const post=()=>{
        axios.put(`http://127.0.0.1:8000/person/student/${detail.id}/`,{name:detail.name,enr_num:detail.enr_num,user:detail.id},{
            headers: {
                'Authorization': `token ${x}`,
              }
        }).then((res)=>{
            window.location.reload();
        },(error)=>{
            alert('Invalid credentials');
            console.log(error.message);console.log(error.response);
            
        });
    }
    
    
    
    return(
        <>
            <label htmlFor="name" >Name:</label>
            <input name="name" type="text" value={detail.name} onChange={onDetailChange}></input>
            <br/>
            <label htmlFor="enr_num">Enr_num:</label>
            <input name="enr_num" value={detail.enr_num} onChange={onDetailChange} type="text" ></input>
            

            <button onClick={post} >Update</button> 
            <br/>
        </>
    );
}

export default UpdateStudent1;