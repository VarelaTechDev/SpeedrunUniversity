import React, {useState, useEffect, createContext, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'

import Sidebar from "./components/sidebar/Sidebar";

import WebArea from "./components/home/WebArea";

import Register from "./components/auth/Register";
import Login from './components/auth/Login'

import Profile from "./components/sidebar/Profile";

import Blackboard from './components/blackboard/Blackboard'

import ClassRegister from "./components/blackboard/ClassRegister";
//import UserContext from '../context/UserContext';
import UserContext from "./context/UserContext";



function RouterPage() {
    
    const {getUser, user} = useContext(UserContext)

    return  (
        <Router>
            <Sidebar/>
            
            <Routes className='sidebar-links'>
                <Route exact path='/' element={<WebArea/>}/>

                <Route path='profile/:username' element={<Profile/>}/>

                <Route path='/login' element={<Login/>}/>

                <Route path='/register' element={<Register/>}/>

                <Route path='/blackboard' element={<Blackboard/>}/>

                <Route path='/classRegister' element={<ClassRegister/>}/>
            </Routes>            
        </Router>
    )
};

export default RouterPage;