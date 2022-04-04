import React, {useState, useEffect, createContext, useContext} from 'react';
//import Class_BB from '../classBB/Class_BB'

import './Blackboard.scss'
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'


import StudentModule from './StudentModule'

function Blackboard() {
  
  const {getUser, user} = useContext(UserContext)
  // !Refreshing the page sends two request
  


  // TODO WE ARE ONLY FOCUSING ON SEMESTER ONE!! THIS ISNT DYNAMIC!!!!
  // TODO: We want user to be and have populated
  return (
    <section className='blackboard'>
      {/* ! IMPORTANT THIS IS HOW WE PREVENT NULL WHEN REFRESHING THE PAGE FROM BREAKIGN THE WEBSITE */}
        {user === null || user.username === null? 
          (
            'Loading'
          ) 
        :
          (
            <>
              {user.semesterOne === undefined ? 
                (
                  <>
                    <Link to='/classRegister'>Please register for a class</Link>
                  </>
                ) : 
                (
                  <>
                    <Link to='/classRegister'>Register for more!</Link>
                    {console.log('SUS')}
                    {console.log(user)}
                    {/* <StudentModule userData={user}/> */}
                  </>
                )
              }
            </>
            
            
          )
        }
    </section>
    
  )
}

export default Blackboard