import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import '../index.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


const Login=()=>{

    const useStyles = makeStyles((theme) => ({
        body: {
            minHeight: '100vh',
            display: 'flex',
            
            fontWeight: '400',
            // font-family: sans-serif,
            background:'#12c2e9',  /* fallback for old browsers */
            background: '-webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9)',  /* Chrome 10-25, Safari 5.1-6 */
            background: 'linear-gradient(to right, #f64f59, #c471ed, #12c2e9)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            justifyContent:'center',
          },
          
        //   body, html, .App, #root, .outer {
        //     width: 100%,
        //     height: 100%,
        //   }
      }));
      const classes = useStyles();

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
        <>
        {/* <div style={loginStyle}>
            <label htmlFor="email">Email:</label>
            <input type='email' name='email' label='email' onChange={emailChange} value={email} ></input>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type='password' name='password' label='Password' onChange={passChange} value={password} ></input>
            <br/><br/>
            <Button color="primary" onClick={postData} >Submit</Button>

            
        </div> */}
        <div className={classes.body}>
        <div className="outer">
            <div className="inner">

                <h3>Log in</h3>

                <div className="form-group" >
                    <label htmlFor="email">Email:</label>
                    <input type='email' className="form-control" placeholder="Enter email" name='email' label='email' onChange={emailChange} value={email} ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" placeholder="Enter password" type='password' name='password' label='Password' onChange={passChange} value={password} ></input>
                    
                </div>

                <br/>
                {/* <Button color="primary" onClick={postData} >Submit</Button> */}
                <button onClick={postData} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
        </div>
    </div>
</div>
        </>
    );

};

export default Login;