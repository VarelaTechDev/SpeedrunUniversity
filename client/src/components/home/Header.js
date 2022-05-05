import React from 'react'

import mysrupic from '../../images/Updated_mysrupic.png'

import cert from '../../images/cert.png'
import acc from '../../images/acc.png'
import ins from '../../images/ins.png'
import aff from '../../images/tut.png'

function Header() {
  return (
    <section className='header'>        
        <img src={mysrupic} alt="" />

        

        <div className='display'>
          
          <div className="box">
            <div className="innerBoxTop">
              <img src={cert} alt="" className='displayImg'/>
            </div>

            <div className="innerBoxBot">
              <span>Certificate</span>
            </div>
          </div>


          <div className="box">
            <div className="innerBoxTop">
              <img src={acc} alt="" />
            </div>
            <div className="innerBoxBot">
              <span>Accredited University</span>
            </div>
          </div>


          <div className="box">
            <div className="innerBoxTop">
              <img src={ins} alt="" />
            </div>
            <div className="innerBoxBot">
              <span>Certified Instructors</span>
            </div>
          </div>

          <div className="box">
            <div className="innerBoxTop">
              <img src={aff} alt="" />
            </div>
            <div className="innerBoxBot">
              <span>Affordable Tuition</span>
            </div>
          </div>

        </div>

        <div className='announce'>
          <h2>Campus Announcements</h2>
        </div>
        <div className='text'>
          <p>
            "The best job in the world to work in for a living is my job. My job is to teach people to understand what's important, and how to live a fulfilling life, how to live a good life, and what to do next."
            Konrad, in his late 60s, once told The Washington Post that he was never asked to do any of that when he was a teenager, and only learned as a kid, "Hey I'm young in the world, I've got a job to do, I'm gonna go to college and I'm gonna start a family. So you got to tell the world that, okay that's good."
            But the fact that he took his first job as a bartender in college as a teenager and never worked again, combined with his growing age, made his decision to start a family easy for the boy who once described himself as a "dude living in a city" all the more poignant. The decision of finding a place to raise her as a single family came at a critical juncture: her place in the family was so important, and it was time to start a family.
            Konrad, born to Chinese parents in the late 1970s, grew up immersed in the culture of the late 19th century, and for a while when it all came together, her two-year-old sister was the only one who didn't feel the same way about doing it.
          </p>
        </div>

    </section>
  )
}

export default Header