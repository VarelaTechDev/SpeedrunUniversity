import Axios from 'axios'
import React from 'react'
import {UserContextProvider} from './context/UserContext'
import Router from './Router'

// ? Webpack allows us to use scss
// ^ This stylesheet is ran before all others
import './style/index.scss'

// ^ Responose Media Queries
import './style/breakpoints.scss'

// ^ Set every Axios call with credtials to allow cookies
Axios.defaults.withCredentials = true

function App(){
    return(
        <UserContextProvider>
            <div className='container'>
                <Router/>
            </div>
        </UserContextProvider>
    )
}