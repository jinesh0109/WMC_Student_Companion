import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AdminDash  from './components/dashboard/admin';
import StudDash  from './components/dashboard/student2';
import AddStudent  from './components/Actions/AddStudent';
const App2=()=>{
    const is_student=localStorage.getItem('is_student');
    return (
        <>
            
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path='/' component={Singup} /> */}
                    <Route exact path='/' component={Login} />
                    <Route exact path='/home' component={is_student=="true"?StudDash:AdminDash} />
                    <Route exact path='/home/addstudent' component={AddStudent} />
                </Switch>
            </BrowserRouter>

        </>
    )
};

export default App2;