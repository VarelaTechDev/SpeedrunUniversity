import React, {useState, useEffect, useContext} from "react";

import Axios from 'axios'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'

import UserContext from '../../../context/UserContext'
import domain from '../../../util/domain'

import ErrorMessage from '../../misc/ErrorMessage'

import './ClassRegister.scss'

import { doAlgo } from "../Main/UserAlgo";

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
    
    const [reportCardData, setReportCardData] = useState(undefined)

    useEffect(() => {
        getClasses()
        getReportCard()
        console.log(reportCardData)
    }, [])

    function getFirstChar(classId){
        // console.log(classId.charAt(0))
        // console.log(classId.charAt(0) == '1')
        return classId.charAt(0)
    }

    async function getReportCard(){
        console.log(user.username)
        const response = await Axios.get(`${domain}/auth/reportCard/${user.username}`)
        setReportCardData(response.data)
    }

    async function getClasses(){
        getUser()
        const classResponse = await Axios.get(`${domain}/courses/list`)
        
        const data = classResponse.data
        console.log(data)
        
        
        const filterSemesterOne = data.filter((course) => getFirstChar(course.ClassId) == "1")
        setSemesterOneClasses(filterSemesterOne)
        
        
        

        const filterSemesterTwo = data.filter((course) => getFirstChar(course.ClassId) == "2")
        setSemesterTwoClasses(filterSemesterTwo)

        setKlasses(classResponse.data)
    }

    function getFirstNum(classId){
        return parseInt(classId.charAt(0))
    }

    function algoSemesterTwo(){
        // Array(5) [ {…}, {…}, {…}, {…}, {…} ]
        // 0: Object { _id: "627425da21e0cc04d51714a6", ClassId: "250", Tag: "CSC", … }
        // 1: Object { _id: "627425da21e0cc04d51714a8", ClassId: "235", Tag: "CSC", … }
        // 2: Object { _id: "627425da21e0cc04d51714aa", ClassId: "225", Tag: "MAT", … }
        // 3: Object { _id: "627425da21e0cc04d51714ac", ClassId: "205", Tag: "RRS", … }
        // 4: Object { _id: "627425da21e0cc04d51714ae", ClassId: "205", Tag: "AA", … }
        console.log(semesterTwoClasses)

        // Array [ {…}, {…} ]
        // 0: Object { _id: "627425e4c16026218402d220", ClassId: "130", Tag: "CSC", … }​
        // 1: Object { _id: "627425e8c16026218402d232", ClassId: "115", Tag: "MAT", … }

        let cscArray = semesterTwoClasses.filter((course) => getFirstChar(course.Tag) == 'C')
        let matArray = semesterTwoClasses.filter((course) => getFirstChar(course.Tag) == 'M')
        let geArray = semesterTwoClasses.filter((course) => getFirstChar(course.Tag) != 'C' && getFirstChar(course.Tag) != 'M')
        
        let CSC_Counter = 0
        let MAT_Counter = 0
        let GE_Counter = 0


        // We will append
        let sortedArray = []
        for(let i = 0; i < reportCardData.courses.length; i++){
            if(reportCardData.courses[i].Tag == 'CSC'){
                CSC_Counter = CSC_Counter + (parseInt(reportCardData.courses[i].ClassId) * reportCardData.courses[i].Grade * .10)
                if(reportCardData.courses[i].Grade <= 60)
                    CSC_Counter -= 1000
            }
            else if(reportCardData.courses[i].Tag == 'MAT'){
                MAT_Counter = MAT_Counter + (parseInt(reportCardData.courses[i].ClassId) * reportCardData.courses[i].Grade * .10)
                if(reportCardData.courses[i].Grade <= 60)
                    MAT_Counter -= 1000
            }

            else{
                GE_Counter = GE_Counter + (parseInt(reportCardData.courses[i].ClassId) * reportCardData.courses[i].Grade * .10)
                if(reportCardData.courses[i].Grade <= 60)
                    GE_Counter -= 1000
            }
        }

        console.log(CSC_Counter)
        console.log(MAT_Counter)
        console.log(GE_Counter)

        // If CSC is the highest
        if(CSC_Counter >= MAT_Counter && CSC_Counter >= GE_Counter){
            sortedArray.push(...cscArray)
            if(MAT_Counter >= GE_Counter){
                sortedArray.push(...matArray)
                sortedArray.push(...geArray)
            }
            else{
                sortedArray.push(...geArray)
                sortedArray.push(...matArray)
            }
        }

        if(MAT_Counter > CSC_Counter && MAT_Counter > GE_Counter){
            sortedArray.push(...matArray)
            console.log("JOE")
            if(CSC_Counter > GE_Counter){
                sortedArray.push(...cscArray)
                sortedArray.push(...geArray)
            }
            else{
                sortedArray.push(...geArray)
                sortedArray.push(...cscArray)
            }
        }

        console.log(geArray)
        if(GE_Counter > (CSC_Counter && GE_Counter > MAT_Counter)){
            console.log("HELLO")
            sortedArray.push(...geArray)
            if(CSC_Counter > MAT_Counter){
                sortedArray.push(...cscArray)
                sortedArray.push(...matArray)
            }
            else{
                sortedArray.push(...matArray)
                sortedArray.push(...cscArray)
            }
        }

        console.log(sortedArray)
        // setSemesterTwoClasses(sortedArray)
        console.log(semesterTwoClasses)
        return sortedArray
        //console.log(sortedArray)
        // setSemesterTwoClasses(sortedArray)
        //console.log('SEMESTER TWO')

        //console.log(semesterTwoClasses)
    }

    return  (
        <div className="class-form-css">
            <p>
                The following classes are taught at Speedrun University
            </p>
            {klass.length == 0 || user == null || reportCardData == undefined? 
                ('Loading')    
                :
                    doAlgo(reportCardData.courses) ? 
                        (
                            
                            algoSemesterTwo().map((item, i) => {
                                return <DisplayModule key={i} Synopsis={item.Synopsis} ClassId={item.ClassId} Name={item.Name} Tag={item.Tag}Professor={item.Professor} UserData={user}/>
                            })
                            // algoSemesterTwo(),
                            // semesterTwoClasses.map((item, i) => {
                            //     return <DisplayModule key={i} Synopsis={item.Synopsis} ClassId={item.ClassId} Name={item.Name} Tag={item.Tag}Professor={item.Professor} UserData={user}/>
                            // })
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