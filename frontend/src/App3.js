import React from 'react';
import {BrowserRouter,Route,Switch,NavLink} from "react-router-dom";
import AdminDashboard from './components/dashboard/admin';
import StudentDashboard from './components/dashboard/student';
const App2=()=>{
    const home=()=>{
        return (
            <>
                <h1>Home Page</h1>
            </>
        )
    };
    return( 
    <>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={home}></Route>
                <Route exact path='/admin/dashboard/' component={AdminDashboard}></Route>
                <Route exact path='/student/dashboard/' component={StudentDashboard}></Route>
            </Switch>
        </BrowserRouter>
        
    </>
    );
};

export default App2;