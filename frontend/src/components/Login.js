import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import '../index.css';
import axios from 'axios';
const Login=()=>{

    const loginStyle={marginLeft:'50%'};
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const emailChange=(event)=>{
        setEmail(event.target.value);
    };
    const passChange=(event)=>{
        setPassword(event.target.value);
    };

    const postData=()=>{
        axios.post('http://127.0.0.1:8000/person/token',{
            // email:email,
            username:email,
            password:password,
            headers: { 
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
              }

        }
        
            ).then((response)=>{
                console.log(response.data);
                if(response.data){
                    console.log(response.data);
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('email',response.data.email);
                    localStorage.setItem('is_student',response.data.is_student);
                    window.location.replace('/home');
                    
                }
                else{
                    alert('Invalid credentials');    
                }
                
            },(error)=>{
                console.log(error.response);
                console.log(error.request);
                console.log(error.message);
                alert('Invalid credentials');
            })
    };
    return (
        <div style={loginStyle}>
            <label htmlFor="email">Email:</label>
            <input type='email' name='email' label='email' onChange={emailChange} value={email} ></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type='password' name='password' label='Password' onChange={passChange} value={password} ></input>
            <br/><br/>
            <Button color="primary" onClick={postData} >Submit</Button>

            
        </div>
    );

};

export default Login;