import React, {useState, useContext} from "react";

import { useNavigate } from 'react-router'

import Axios from 'axios'

import UserContext from '../../../context/UserContext'
import domain from '../../../util/domain'

import './DisplayModule.scss'

function DisplayModule({ClassId, Name, Professor, Tag, Synopsis, UserData}) {
    
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
            await Axios.put(`${domain}/auth/${UserData.username}/${ClassId}`)
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
        <form onSubmit={applyForClass}>
            <div className='classDesign'>
                
                <div className='classHeader'>
                    <span>{Name}</span>
                </div>
                
                <div className='classInfo'>
                    <span>{Tag} {ClassId}</span>
                    <span>Professor: {Professor}</span>
                    <span className='spanTag'>{Synopsis}</span>
                </div>

                <div className='registerButton'>
                    <button 
                        className='btn-submit' 
                        type='submit'
                    >
                        Click to Apply
                    </button>
                </div>

            </div>
        </form>
    )
};

export default DisplayModule;