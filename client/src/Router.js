import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Sidebar from "./components/sidebar/Sidebar";

import HomeArea from "./components/home/HomeArea";

import Register from "./components/auth/Register";
import Login from './components/auth/Login'

import Profile from "./components/sidebar/Profile";

import Blackboard from './components/blackboard/Blackboard'
import ClassRegister from "./components/blackboard/register/ClassRegister";

// ? We can use <Link/> anywhere in the app to redirect to a URL and call the propert COMPONENT
function RouterPage() {
    return  (
        <Router>

            <Sidebar/>
            
            <Routes className='sidebar-links'>
                <Route exact path='/' element={<HomeArea/>}/>

                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>

                <Route path='profile/:username' element={<Profile/>}/>

                <Route path='/blackboard' element={<Blackboard/>}/>
                <Route path='/classRegister' element={<ClassRegister/>}/>

            </Routes>            
        </Router>
    )
};

export default RouterPage;