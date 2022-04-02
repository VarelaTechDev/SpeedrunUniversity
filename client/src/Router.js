import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar";

import WebArea from "./components/home/WebArea";

import Register from "./components/auth/Register";
import Login from './components/auth/Login'

import Profile from "./components/sidebar/Profile";

import Blackboard from "./components/blackboard/Blackboard";

import ClassLearning from "./components/classLearning/ClassLearning";


function RouterPage() {
    return  (
        <Router>
            <Sidebar/>
            
            <Routes className='sidebar-links'>
                <Route exact path='/' element={
                    <WebArea/>
                }/>

                <Route path='profile/:username' element={<Profile/>}/>

                <Route path='/login' element={<Login/>}/>

                <Route path='/register' element={<Register/>}/>

                <Route path='/blackboard' element={<Blackboard/>}/>

                <Route path='class/:classId' element={<ClassLearning/>}/>
            </Routes>

            {/* <Routes className='mainside-links'>
                <Route path='test' element={
                    <Login/>
                }/>
            </Routes> */}
            
            
        </Router>
    )
};

export default RouterPage;