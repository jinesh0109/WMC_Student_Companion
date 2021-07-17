import React, { useState } from 'react';

function UpdateStudent1(props) {
    console.log(props);
    // const { person: { name, enr_num } } = props;
    const {name,enr_num}=props.props;
    // const[details,setDetails]=useState({
        
    // });

    console.log();
    
    // setDetails((previousVal)=>({...previousVal,[name]:props.name,[enr_num]:props.enr_num

    // }));
    
    return(
        <>
            <label htmlFor="name" >Name:</label>
            <input name="name" type="text" value={name} ></input>
            <br/>
            <label htmlFor="enr_num">Enr_num:</label>
            <input name="enr_num" value={enr_num} type="text" ></input>
            

            <button >Update</button>
            <br/>
        </>
    );
}

export default UpdateStudent1;