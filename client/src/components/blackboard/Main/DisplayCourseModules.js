import React, {useState, useEffect, createContext} from "react";
import { Link } from 'react-router-dom'

import domain from "../../../util/domain";

import './ClassDisplay.scss'
import ClassRender from "../StudentSelectedCourses/ClassRender";
import { doAlgo } from "./UserAlgo";

const Axios = require('axios')

function ClassDisplay({user}) {
    const [userDataWithClasses, setUserDataWithClasses] = useState(undefined)    

    const [reportCardData, setReportCardData] = useState('')

    // ! Change this
    function getFirstChar(){
        let numOfCourses = userDataWithClasses
        console.log(numOfCourses.length)
        return numOfCourses.length
    }


    useEffect(()=>{
        const getClassResponse = async() => {
            
            const classResponse = await Axios.get(`${domain}/auth/courses/${user}`)
            const data = classResponse.data[0].courses
            // globalData = [...data]
            setUserDataWithClasses(data)
            
            const getReportCard = async() => {
                const response = await Axios.get(`${domain}/auth/reportCard/${user}`)
                // console.log(response.data)
                setReportCardData(response.data.courses)
                // console.log(doAlgo(reportCardData))
            }
            getReportCard()
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
                                    // > Go to courseCatalog if we haven't registered for a course yet
                                    <div className='noCourses'>
                                        <Link to='/classRegister' className='link-style-solo'>
                                            Register for some courses now!
                                        </Link>
                                    </div>
                                )
                                :
                                (
                                    // > Go display course modules if we have some courses
                                    <>
                                        {console.log(user)}
                                        {doAlgo(reportCardData)}
                                        {userDataWithClasses.map((list, i) => {
                                            getFirstChar()
                                            
                                            return <ClassRender key={i} classData={list}/>
                                        })}
                                        {
                                            getFirstChar() < 2 && !doAlgo(reportCardData)?
                                                <Link to='/classRegister' className='link-style'>
                                                    Register for more courses!
                                                </Link>
                                            :
                                            <Link to='/classRegister' className='link-style'>
                                                Semester Two
                                            </Link>
                                        }
                                        
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