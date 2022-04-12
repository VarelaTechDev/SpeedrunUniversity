import Axios from 'axios'
import React from 'react'
import { UserContextProvider } from "./context/UserContext"
import Router from './Router'

// * Webpack allows us to use scss :: This stylesheet is ran BEFORE everything else
import './style/index.scss'

// * Add RESPONSIVE MEDIA QUERIES
import './style/breakpoints.scss'

// * Set every AXIOS call with CRENDTIALS to allow cookies
Axios.defaults.withCredentials = true

function App(){
  return(
    // * Wrap our Routers with UserContext [Making it GLOBAL]
    <UserContextProvider>
      <div className="container">
        <Router/>
      </div> 
    </UserContextProvider>
  )
}

export default App