import React from 'react'
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Home from './components/Home'


function RouterPage(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={
                    <Home/>
                }/>

                


            </Routes>



    </BrowserRouter>
    )
}

export default RouterPage