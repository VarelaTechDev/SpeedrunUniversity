import React, {useState, useEffect, useContext} from "react";

import Axios from 'axios'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'

import UserContext from '../../../context/UserContext'
import domain from '../../../util/domain'

import ErrorMessage from '../../misc/ErrorMessage'

import './ClassRegister.scss'

import DisplayModule from "./DisplayTaughtCourses";

function ClassRegister() {
    // ! TEMP HOLDER TO REMOVE ERRORS
    const classId = 120
    
    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser, user} = useContext(UserContext)

    const[listOfClasses, setListOfClasses] = useState([])

    const navigate = useNavigate()

    const [klass, setKlasses] = useState([])

    const [semesterOneClasses, setSemesterOneClasses] = useState([])
    const [semesterTwoClasses, setSemesterTwoClasses] = useState([])
    
    useEffect(() => {
        getClasses()
    }, [])

    function getFirstChar(classId){
        // console.log(classId.charAt(0))
        console.log(classId.charAt(0) == '1')
        return classId.charAt(0)
    }

    async function getClasses(){
        const classResponse = await Axios.get(`${domain}/courses/list`)
        
        const data = classResponse.data
        console.log(data)
        
        
        const filterSemesterOne = data.filter((course) => getFirstChar(course.ClassId) == "1")
        setSemesterOneClasses(filterSemesterOne)
        
        const filterSemesterTwo = data.filter((course) => getFirstChar(course.ClassId) == "2")
        setSemesterTwoClasses(filterSemesterTwo)
        
        

        setKlasses(classResponse.data)
    }

    return  (
        <div className="class-form-css">
            <p>
                The following classes are taught at Speedrun University
            </p>
            {klass.length == 0 || user == null? 
                ('Loading')    
                :
                
                    user.completedSemesterOne ? 
                        (
                        semesterTwoClasses.map((item, i) => {
                            return <DisplayModule key={i} Synopsis={item.Synopsis} ClassId={item.ClassId} Name={item.Name} Tag={item.Tag}Professor={item.Professor} UserData={user}/>
                        })
                        )
                        :
                        (
                        semesterOneClasses.map((item, i) => {
                            return <DisplayModule key={i} Synopsis={item.Synopsis} ClassId={item.ClassId} Name={item.Name} Tag={item.Tag}Professor={item.Professor} UserData={user}/>
                        })
                        )
                    
                    
                    
                    
                
            }
        </div>
    )
}

export default ClassRegister;