import React, {useState, useEffect, createContext} from "react";

import {convert} from '../blackboard/StudentSelectedCourses/ConvertNumToGrade'

function DisplayGrades({grades}) {
    return  (
        <div className="class">
            <div className="leftMost">
                <p>{grades.Tag} {grades.ClassId}</p>
                
                <p>{grades.Name}</p>
            </div>

            <div className="rightMost">
                {grades.CompletedQuiz ?
                (
                    <p>{convert(grades.Grade)}</p>
                )
                :
                (
                    <p></p>
                )
                }
            </div>
            
        </div>
    )
};

export default DisplayGrades;