import React, {useState, useEffect, createContext, useContext} from "react";

import Axios from 'axios'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import ErrorMessage from '../misc/ErrorMessage'

import './ClassRegister.scss'

import ClassInfo from "./ClassInfo";

import DisplayModule from "./DisplayModule";

function ClassRegister() {
    // ! TEMP HOLDER TO REMOVE ERRORS
    const classId = 120
    
    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser, user} = useContext(UserContext)

    const[listOfClasses, setListOfClasses] = useState([])

    const navigate = useNavigate()

    const [klass, setKlasses] = useState([])

    useEffect(() => {
        getClasses()
    }, [])

    async function getClasses(){
        const classResponse = await Axios.get(`${domain}/courses/list`)
        setKlasses(classResponse.data)
    }

    async function submitClass(e){
        e.preventDefault()
        const classData = {
            username: user.username,
            semesterNum: 1,
            ClassId: classId
        }

        try{
            //await Axios.post(`${domain}/auth/login`, loginData)
            await Axios.put(`${domain}/${user.username}/${1}/${classId}`)
        }catch(err){
            if(err.response){
                setErrorMessage(err.response.data.errorMessage)
            }
            return
        }
        // Meant to update the user
        await getUser()
        navigate('/blackboard')
    }

    return  (
        <div className="class-form">
            <p>
                The following classes are taught at Speedrun University:
            </p>
            {klass.length == 0 || user == null? 
                ('Loading')    
                :
                (
                    //'Look at me'
                    klass.map((item, i) => {
                        //console.log(item.Name)
                        // return <p key={i}>{
                        //     item.Name
                        // }</p>
                        return <DisplayModule key={i} ClassId={item.ClassId} Name={item.Name} Professor={item.Professor} UserData={user}/>
                    })
                    
                )
            }
        </div>
    )
}

export default ClassRegister;