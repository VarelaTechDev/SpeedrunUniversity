import React, {useState, useEffect, createContext} from "react";

import Axios from 'axios'

import './StudentModule.scss'
import domain from "../../util/domain";

import CourseModule from "./CourseModule";
import DisplayModule from "./DisplayModule";

function StudentModule({userData}) {
    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        // getPopulatedUserInfo(userData.username)
        const getPopulatedUserInfo = async () => {
            const response = await Axios.get(`${domain}/auth/${userData.username}`)
            const data = response.data[0]
            if(data.semesterOne) setStudent(data.semesterOne)
            if(data.semesterTwo) addClassToEnd(data.semesterTwo)
            setLoading(false)
        }
        
        getPopulatedUserInfo()
            // .then(setLoading(false))
            .catch(console.error);;
    },[])


    // ? Append to the end of the list
    const addClassToEnd = (newUser) => {
        setStudent(state => [state, newUser])
    }

    function renderCourses(){
        let courses = [...student]
        console.log(courses)
        return courses.map((item, i) => {
            return (<CourseModule key={i} data={item}/>)
        })
    }

    // TODO: WE ONLY RENDER SEMESTER ONE ATM 
    // TODO: Editing code from Blackboard works normally, but editting here renders it twice???
    return  (
        <div className="class">
            <p>{userData.username}</p>
            
            <div className='displayUserClasses'>
                {/* {student == [] || student.length == 0?( */}
                {/* {loading == true || student == [] || student[0] == undefined || student[1] == undefined ? ( */}
                {loading === true ? (
                    'Loading'
                ):(
                <>
                    {console.log("Rendered FROM studentModule")}
                    {renderCourses()}

                    
                </>
                    
                    
                )}
            </div>
            
        </div>
    )

};

export default StudentModule;