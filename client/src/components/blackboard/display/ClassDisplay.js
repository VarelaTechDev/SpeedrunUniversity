import React, {useState, useEffect, createContext} from "react";
import { Link } from 'react-router-dom'

import domain from "../../../util/domain";

import './ClassDisplay.scss'
import ClassRender from "./ClassRender";

const Axios = require('axios')

function ClassDisplay({user}) {
    const [userDataWithClasses, setUserDataWithClasses] = useState(undefined)    

    useEffect(()=>{
        const getClassResponse = async() => {
            
            const classResponse = await Axios.get(`${domain}/auth/courses/${user}`)
            const data = classResponse.data[0].courses
            // globalData = [...data]
            setUserDataWithClasses(data)
        }

        getClassResponse()
            .catch(console.log)
    }, [])
        

    return (
        <div className='classDisplay'>
            {
                userDataWithClasses == undefined? 
                (
                    <>
                        <p>Loading</p>
                    </>
                ) 
            : 
                (
                    <> 
                            {userDataWithClasses.length == 0 ?
                                (
                                    <div className='no-courses'>
                                        <Link to='/classRegister' className='link-style' style={{
                                            color: 'black',
                                            marginLeft: '0.8em',
                                        }}
                                        >
                                            Register for some courses now!
                                        </Link>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {userDataWithClasses.map((list, i) => {
                                            return <ClassRender key={i} classData={list}/>
                                        })  }
                                        
                                        <Link to='/classRegister' className='link-style' style={{
                                            color: 'black',
                                            marginLeft: '0.8em'
                                        }}
                                        >
                                            Register for more courses!
                                        </Link>
                                    </>
                                )
                            }
                            
                    </>
                    
                )
            }
                    
        </div>
    )
}

export default ClassDisplay