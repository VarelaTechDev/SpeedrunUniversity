import React, {useState, useEffect, createContext, useContext} from "react";

import { useNavigate } from 'react-router'

import Axios from 'axios'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import './DisplayModule.scss'

function DisplayModule({ClassId, Name, Professor, UserData}) {
    
    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser, user} = useContext(UserContext)

    const [username, setUsername] = useState(UserData.username)
    const [name, setName] = useState(Name)
    const [professor, setProfessor] = useState(Professor)
    

    const navigate = useNavigate()

    async function applyForClass(e){
        e.preventDefault()
        const classData = {
            username: UserData.username,
            semesterNum: 1,
            ClassId
        }

        try{
            //await Axios.post(`${domain}/auth/login`, loginData)
            await Axios.put(`${domain}/auth/${UserData.username}/${1}/${ClassId}`)
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

    
    async function checkForClasses(userData, ClassId){
        if(!userData.semesterOne) return false
        
        if(userData.semesterOne.classOneId == ClassId) return true

        if(userData.semesterOne.classTwoId == ClassId) return true
        
        if(!userData.semesterTwo) return false
        if(userData.semesterTwo.classOneId == ClassId) return true

        if(userData.semesterTwo.classTwoId == ClassId) return true

        return false;
    }

    return  (
        // <div className="class">
        <form className='class' onSubmit={applyForClass}>
            <div className='classInfo'>
                <p>{UserData.username}</p>
                <p>Course Id: {ClassId}</p>
                <p>ClassName: {Name}</p>
                <p>{Professor}</p>
            </div>
            
            <div className='misc'>
                <button 
                    className='btn-submit' 
                    type='submit'
                >
                    Click to Apply
                </button>
            </div>
            
        {/* </div> */}
        </form>
    )
};

export default DisplayModule;