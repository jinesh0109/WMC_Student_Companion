import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RetrieveStudent=()=>{
    const x=localStorage.getItem('token');
    const[details,setDetails]=useState({
        user:'',
        name:'',
        enr_num:'',
        course:[],
    });

    useEffect((num)=>{
        axios.get(`http://127.0.0.1:8000/person/student/${1}/`,{
            headers: {
                'Authorization': `token ${x}`,
              }
        }).then((res)=>{
            console.log(res.data[0]);
            
            if(res.data){
                setDetails(res.data[0]);
            }
        },(error)=>{
            console.log(error.response);
            console.log(error.request);
            console.log(error.message);

        })
    },[]);
    return(
        <>
            <h1>User:{details.user}</h1>
            <h1>Name:{details.name}</h1>
            <h1>Enr number:{details.enr_num}</h1>
            <h1>Course:{details.course}</h1>
        </>
        
    );
};

export default RetrieveStudent;