import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const CreateTask=()=>{
   const getCurrentDate=(separator='-')=>{

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        // return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        return new Date().toLocaleString() + ''
        }
    const x=localStorage.getItem('token');
    const [taskData,settaskData]=useState({
        title:'',
        desc:'',
        due_date:getCurrentDate(),
    });

    const change=((event)=>{
        settaskData((prevVal)=>({...prevVal,[event.target.name]:event.target.value}))
        // console.log(getCurrentDate());
    });
    const sendData=(()=>{
        axios.post(`http://127.0.0.1:8000/person/todo/`,{title:taskData.title,desc:taskData.desc,due_date:taskData.due_date},{
            headers: {
                'Authorization': `token ${x}`,
              }
        }).then((res)=>{
            window.location.reload();
        },(error)=>{
            alert('Invalid credentials');
            console.log(error.message);console.log(error.response);
            
        });
    });
    return (
        <div style={{background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%'
        }}>
            
            <br/><br/>
            <label htmlFor="title" style={{fontSize:30}}>Title:</label>
            <input type='text' name='title' label='title' onChange={change} value={taskData.title} ></input>
            <br/><br/><br/>

            
            <textarea placeholder="Description" style={{fontSize:20}} name="desc" label='desc' onChange={change} value={taskData.desc}  rows="5" cols="50">
                
            </textarea>
            <br/><br/><br/>

            <TextField
                size='medium'
                label="Due Date:"
                name="due_date"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                
                InputLabelProps={{
                shrink: true,
                "aria-setsize":100
                
                }}
                onChange={change}
                value={taskData.due_date}
            />
            <br/><br/>

            <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={sendData}
                startIcon={<SaveIcon />}>
                SAVE
                
            </Button>
            <br/><br/><br/>
        </div>
    )
};

export default CreateTask;