import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Navbar  from './components/dashboard/admin';
import AddStudent  from './components/Actions/AddStudent';
const App2=()=>{
    return (
        <>
            
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path='/' component={Singup} /> */}
                    <Route exact path='/' component={Login} />
                    <Route exact path='/home' component={Navbar} />
                    <Route exact path='/home/addstudent' component={AddStudent} />
                </Switch>
            </BrowserRouter>

        </>
    )
};

export default App2;