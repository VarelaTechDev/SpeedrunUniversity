import React, {useState, useEffect, createContext, useContext} from "react";

import Axios from 'axios'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import ErrorMessage from '../misc/ErrorMessage'

import './ClassRegister.scss'

import ClassInfo from "./ClassInfo";

function ClassRegister() {
    // ! TEMP HOLDER TO REMOVE ERRORS
    const classId = 120
    
    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser, user} = useContext(UserContext)

    const[listOfClasses, setListOfClasses] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getClasses()
        getUser()
    }, [])

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

    async function getClasses(e){
        const classList = await Axios.get(`${domain}/courses/list`)
        setListOfClasses(classList)

        let list = [listOfClasses]
        return list[0].data.map((classBox, i) => {
            return(
                <ClassInfo
                    key={i}
                    classData={classBox}
                    getClassFunction={getClasses}
                />
            )
        })
    }

    function renderClasses(){

    }


    return  (
        <div className="class-form">
            {renderClasses()}
        </div>
    )
};

export default ClassRegister;