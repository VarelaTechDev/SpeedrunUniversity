import React, {useState, useEffect, createContext} from "react";

import Axios from 'axios'

import './StudentModule.scss'
import domain from "../../util/domain";

function StudentModule({userData}) {
    const [student, setStudent] = useState([])
    
    useEffect(()=>{
        getPopulatedUserInfo(userData.username)
    }, [])

    async function getPopulatedUserInfo(userOfName){
        const response = await Axios.get(`${domain}/auth/${userOfName}`)
        console.log(response.data[0])
        setStudent(response.data[0])
    }
    

    
    return  (
        <div className="class">
            <p>{userData.username}</p>
            
            <div className='displayUserClasses'>
                {student === null? (
                    'Loading'
                ):(
                <>
                    {console.log(student)}
                    {/* ! WE HAVE ALL THE DATA NOW NOW WE JUST FORMAT IT */}
                    <p>{student.semesterOne.classOneId.Name}</p>
                </>
                    
                    
                )}
            </div>
            
        </div>
    )
};

export default StudentModule;