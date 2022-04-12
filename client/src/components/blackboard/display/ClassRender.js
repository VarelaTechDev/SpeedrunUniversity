import React, {useState, useEffect, createContext} from "react";

import {Link} from 'react-router-dom'

function ClassRender({classData}) {
// function ClassRender() {
    return  (
        
        <div className="class">
            <Link to={`/courses/${classData.ClassId}`}>
                {/* <p>ClassId: {classData.ClassId}</p> */}
                <p>{classData.Name}</p>
                <p>Professor: {classData.Professor}</p>
                <p>Grade: {classData.Grade}</p>
            </Link>
            
        </div>

    )
};

export default ClassRender;