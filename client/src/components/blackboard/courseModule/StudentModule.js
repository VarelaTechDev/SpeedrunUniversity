import React, {useState, useEffect, useContext} from "react";

import Axios from 'axios'

import './StudentModule.scss'
import domain from "../../../util/domain";

import UserContext from '../../../context/UserContext'

import { useParams } from "react-router-dom";

import './StudentModule.scss'

import {getGrade} from './calculateGrade'

import { useNavigate } from 'react-router'

function StudentModule() {
    const{ClassId} = useParams()

    const [loading, setLoading] = useState(true)
    const {getUser, user} = useContext(UserContext)

    const navigate = useNavigate()

    const [classData, setClassData] = useState()
    
    const [questionOneAnswer, setQuestionOneAnswer] = useState('')
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState('')
    // const [questionThreeAnswer, setQuestionThreeAnswer] = useState('')
    
    const [isQuizCompleted, setIsQuizCompleted] = useState(true)

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
                .catch(console.error);;
        }
    },[user])


    async function submitQuiz(e){
        e.preventDefault()
        console.log(ClassId)
        await getGrade(user, ClassId, questionOneAnswer, questionTwoAnswer)
        navigate(`/blackboard`)

        

    }

    return  (
        <div className="student-module">
            <div className='displayUserClasses'>
                {loading == true || classData == undefined? 
                    (
                        <>
                            <h1>Loading</h1>
                        </>    
                    )
                :
                    (
                        classData.chapterOne.completedQuiz == true ?
                        // classData.chapterOne.completedQuiz == true ?
                            (
                                <>
                                    <h1>Loading</h1>
                                </>
                            )
                        :
                            (
                                <>
                                    {/* {console.log(classData)}
                                    {console.log(user)} */}
                                    <h3>{classData.chapterOne.reading}</h3>
                                    <h4>Quiz</h4>
                                    
                                    {/* ! GIVE THEM THE SAME NAME TO PREVENT DOUBLEW CLICKING!!! */}
                                    <form className='form-quiz' onSubmit={submitQuiz}>
                                        
                                        <div className='questionOne'>
                                            <p>1) {classData.chapterOne.questionOne}</p>
                                            
                                            <input type="radio" value='WRONG' id="qOneOne" name="qOne" onClick={(e) => setQuestionOneAnswer(e.target.value)}/>            
                                            <label htmlFor="qOneOne">3x</label>

                                            <br/>
                                            
                                            <input type="radio" value={classData.chapterOne.answerOne} id="qOneTwo" name="qOne" onClick={(e) => setQuestionOneAnswer(e.target.value)}/>            
                                            <label htmlFor={classData.chapterOne.answerOne}>{classData.chapterOne.answerOne}</label>

                                        </div>
                                        
                                        <div className='questionTwo'>
                                            <p>2) {classData.chapterOne.questionTwo}</p>
                                            
                                            <input type="radio" value="WRONG" id="qTwoOne" name="gTwo" onClick={(e) => setQuestionTwoAnswer(e.target.value)} />            
                                            <label htmlFor="qTwoOne">3x</label>
                                            
                                            <br/>
                                            
                                            <input type="radio" value={classData.chapterOne.answerTwo} id="qTwoTwo" name="gTwo" onClick={(e) => setQuestionTwoAnswer(e.target.value)}/>            
                                            <label htmlFor="qTwoTwo">{classData.chapterOne.answerTwo}</label>
                                        </div>

                                        <button className='btn-submit' type='submit'>Submit</button>
                                    </form>
                                </>
                            )
                    )
                }
            </div>
        </div>
    )

};

export default StudentModule;