import React from "react";
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar";

import WebArea from "./components/home/WebArea";

import Register from "./components/auth/Register";
import Login from './components/auth/Login'

import Profile from "./components/sidebar/Profile";

function RouterPage() {
    return  (
        <BrowserRouter>
            <Sidebar/>
            
            <Routes className='sidebar-links'>
                <Route exact path='/' element={
                    <WebArea/>
                }/>

                <Route path='profile/:username' element={
                    <Profile/>
                }/>

                <Route path='/login' element={
                    <Login/>
                }/>

                <Route path='register' element={
                    <Register/>
                }/>

            </Routes>

            {/* <Routes className='mainside-links'>
                <Route path='test' element={
                    <Login/>
                }/>
            </Routes> */}
            
            
        </BrowserRouter>
    )
};

export default RouterPage;