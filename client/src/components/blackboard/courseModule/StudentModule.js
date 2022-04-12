import React, {useState, useEffect, useContext} from "react";

import Axios from 'axios'

import './StudentModule.scss'
import domain from "../../../util/domain";

import UserContext from '../../../context/UserContext'

import { useParams } from "react-router-dom";

import './StudentModule.scss'

function StudentModule() {
    const{ClassId} = useParams()
    const [loading, setLoading] = useState(true)
    const {getUser, user} = useContext(UserContext)
    const [classData, setClassData] = useState()
    
    // ! WE NEED THIS FOR OUR FORMS :: ADD LATER TO THE PROJECT
    // const [formName, setFormName] = useState('')
    // const [formEmail, setFormEmail] = useState('')
    // const [formUsername, setFormUsername] = useState('')
    // const [formPassword, setFormPassword] = useState('')
    // const [formPasswordVerify, setFormPasswordVerify] = useState('')

    useEffect(()=>{
        console.log(loading)
        
        if(user == null) {
            console.log('USER IS NULL')
        }

        else{
            console.log("USER IS LOADED")
            const getPopulatedUserInfo = async () => {
                const response = await Axios.get(`${domain}/auth/courses/${user.username}/${ClassId}`)
                setClassData(response.data.Material)
            }

            getPopulatedUserInfo()
                .then(setLoading(false))
                .then(console.log(classData))
                .catch(console.error);;
        }
    },[user])

    function getDisplay(){
        console.log("HELLO WORLD")
    }
    

    async function submitQuiz(e){
        e.preventDefault()
    }

    return  (
        <div className="student-module">
            <div className='displayUserClasses'>
                {/* {user == null ?  */}
                {loading == true || classData == undefined? 
                (
                    <>
                        <h1>Loading</h1>
                    </>    
                )
                :
                (
                    <>
                        <h3>{classData.chapterOne.reading}</h3>
                        <h4>Quiz</h4>
                        
                        
                        <form className='form-quiz' onSubmit={submitQuiz}>
                            <div className='questionOne'>
                                <p>1) {classData.chapterOne.questionOne}</p>
                                <input type="radio" value="male" id="male" name="gender" />            
                                <label for="male">3x</label>
                                <br/>
                                <input type="radio" value="female" id="female" name="gender"/>            
                                <label for="female">{classData.chapterOne.answerOne}</label>
                            </div>
                            
                            <div className='questionTwo'>
                                <p>2) {classData.chapterOne.questionTwo}</p>
                                <input type="radio" value="male" id="male" name="gender" />            
                                <label for="male">3x</label>
                                <br/>
                                <input type="radio" value="female" id="female" name="gender"/>            
                                <label for="female">{classData.chapterOne.answerTwo}</label>
                            </div>

                            <div className='questionThree'>
                                <p>2) {classData.chapterOne.questionThree}</p>
                                <input type="radio" value="male" id="male" name="gender" />            
                                <label for="male">3x</label>
                                <br/>
                                <input type="radio" value="female" id="female" name="gender"/>            
                                <label for="female">{classData.chapterOne.answerThree}</label>
                            </div>
                            <button className='btn-submit' type='submit'>Submit</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )

};

export default StudentModule;