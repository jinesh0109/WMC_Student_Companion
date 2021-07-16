import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";

//make user,add that user to student
const AddStudent=()=>{
    const x=localStorage.getItem('token');
    let history = useHistory();

    function handleClick() {
        history.push("/home");

    }
    const[progOptions,setProgOptions]=useState({tp:[]});
    const[detail,setDetail]=useState({
        email:'',
        password:'',
        name:'',
        enr_num:'',
        program:'',

    });
    //fetching Programmes
    useEffect(() => {
        const give= async ()=>{
       await axios.get(`http://127.0.0.1:8000/person/program/`,{
        headers: {
            'Authorization': `token ${x}`,
          }
    }).then((res)=>{
        // res.data.map((obj)=>{
        //     s
        // })
        setProgOptions(res.data);
        // console.log(res.data);
        console.log(progOptions);
    },(error)=>{
        console.log('server error');
    });}
    give();
       
    }, [])
    


    const changeDetail=(event)=>{
        
        setDetail((previousVal)=>({...previousVal,[event.target.name]:event.target.value})
            
        )
    };
    
    
    const send=()=>{
        const body={ email:detail.email,
                            password:detail.password,name:detail.name,enr_num:detail.enr_num};
        axios.post(`http://127.0.0.1:8000/person/register/`,body,{
            headers: {
                'Authorization': `token ${x}`,
              }
           
            
        }).then((res)=>{
            console.log(res);
            axios.post(`http://127.0.0.1:8000/person/students/`,{
            email:detail.email,
            name:detail.name,
            enr_num:detail.enr_num,
            program:detail.program,
           },{
                headers: {
                    'Authorization': `token ${x}`,
                  }
                 
            }).then((res)=>{
                console.log('success... :).');
                window.location.replace('/home');
            
            },(error)=>{
                alert('Please enter valid and unique Name & Enr_num');
            //     console.log(error.message);console.log(error.response);
            // console.log(error.request);
                // console.log('Student creation error');
            })
        },(error)=>{
            // console.log(error.message);console.log(error.response);
            // console.log(error.request);
            alert('Please enter valid and unique Email & Password');
            // console.log('User creation error.');
        })
    };

    return (
        <>
            <h1>Add Student</h1>

        <label htmlFor="email">Email:</label>
            <input type='email' name='email' label='email' onChange={changeDetail} value={detail.email} ></input>
            <br/><br/>

            <label htmlFor="password">Password:</label>
            <input type='password' name='password' label='Password' onChange={changeDetail} value={detail.password} ></input>
            <br/><br/>

            <label htmlFor="name">Name:</label>
            <input type='text' name='name' label='name' onChange={changeDetail} value={detail.name} ></input>
            <br/><br/>

             <label htmlFor="enr_num">Enrollment Number: </label>
            <input type='text' name='enr_num' label='enr_num' onChange={changeDetail} value={detail.enr_num} ></input>
            <br/><br/> 

{/* <option value={choice.id} key={choice.id}>{choice.name}</option> */}
            {/* <select >
                {
                    progOptions.map((choice)=>{
                        
                        <h1>Hey</h1>
                    })
                }
                
            </select> */}
                <h1>{progOptions.id}</h1>
            <label htmlFor="program">Program: </label>
            <input type='text' name='program' label='program' onChange={changeDetail} value={detail.program} ></input>
            <br/><br/> 
            
            <button onClick={handleClick}>Cancel</button>
            <button onClick={send}>Submit</button>
        </>
    );
};

export default AddStudent;