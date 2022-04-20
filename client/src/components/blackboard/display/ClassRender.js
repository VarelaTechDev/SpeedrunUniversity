import React, {useState, useEffect, createContext} from "react";

import {Link} from 'react-router-dom'

import {convert} from './ConvertNumToGrade'

import './ClassRender.scss'

function ClassRender({classData}) {
// function ClassRender() {
    return  (
        
        <div className="class">
            {console.log(classData)}
            <Link to={`/courses/${classData.ClassId}`} style={{color: "black", borderLeft: '1em pink solid'}}>
                <div className='info'>
                <p className='tag'>{classData.Tag} {classData.ClassId}</p>
                <p className='name'>{classData.Name}</p>
                <p className='prof'>Professor: {classData.Professor}</p>
                {/* <p>Grade: {classData.Grade}</p> */}
                <p>Grade: {convert(classData.Grade)}</p>
                </div>
                
            </Link>
        </div>

    )
};

export default ClassRender;