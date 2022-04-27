import React, {useState, useEffect, createContext, useContext} from 'react';
//import Class_BB from '../classBB/Class_BB'

import './Blackboard.scss'
import UserContext from '../../../context/UserContext'
import { Link } from 'react-router-dom'

import DisplayCourseModules from './DisplayCourseModules';


function Blackboard() {
  
  const {getUser, user} = useContext(UserContext)
  
  return (
    <section className='blackboard'>
        {user === null || user.username === null? 
          (
            'Loading'
          ) 
        :
          <DisplayCourseModules user={user.username}/> 
        }
    </section>
    
  )
}

export default Blackboard