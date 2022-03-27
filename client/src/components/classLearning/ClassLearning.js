import React from 'react'
import './ClassLearning.scss'

const {classInfo} = require('./hardCodedDB')


function classLearning() {

    

    return (
        <section className='classLearning'>
            <h1>{classInfo[0].name}</h1>
            <p>
                {classInfo[0].basicDescription}
            </p>
            <h2>Quiz</h2>
            <p>
                Question 1: What are the four pillers of OOP?
                <br/>
                A) Abstraction, Encapsultion, Scripting, Polymorphism<br/>
                B) Abstraction, Encapsultion, Inheritance, Polymorphism<br/>
                C) Absolution, Encapsultion, Inheritance, Polymorphism<br/>
                D) Abstraction, Inheritance, Polymorphism<br/>
            </p>
        </section>
    )
}

export default classLearning