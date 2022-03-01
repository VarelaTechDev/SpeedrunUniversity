import Axios from 'axios'
import React from 'react'
import { UserContextProvider } from "./context/UserContext"
import Router from './Router'

// * Webpack allows us to use scss
// ? This stylesheet is ran first before all others
import './style/index.scss'

// ? Resposnive Media Queries
import './style/breakpoints.scss'

// * Set every Axios call with crendtials to allow cookies
Axios.defaults.withCredentials = true

function App(){
  return(
    // ? Don't forget to wrap your top app with the provider
    <UserContextProvider>
      <div className="container">
        <Router/>
      </div> 
    </UserContextProvider>
    
  )
}

export default App

