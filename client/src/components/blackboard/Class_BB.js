import React from 'react'

import ClassComp from './ClassComp/ClassComp'

import './Class_BB.scss'

import UserContext from '../../context/UserContext'

function Class_BB() {
  return (
    <section>
        <h1>Semester One</h1>
        <ClassComp classId='120' classNum="CSC 120" className="Intro to Java Programming" professorName="Professor Oak"/>
        <ClassComp classId="190" classNum="MAT 190" className="Calculus I" professorName="Professor Rowan"/>
        <ClassComp classId="21" classNum="ART 190" className="Intro the Art" professorName="Professor Rowan"/>

        <h1>Semester Two</h1>
        <ClassComp classId='122' classNum="CSC 122" className="Advanced Java Programming" professorName="Professor Oak"/>
        <ClassComp classId="192" classNum="MAT 192" className="Calculus II" professorName="Professor Rowan"/>
        <ClassComp classId="11" classNum="CSC 290" className="Automate the Boring Stuff with Python" professorName="Professor Rowan"/>
    </section>
  )
}

export default Class_BB
