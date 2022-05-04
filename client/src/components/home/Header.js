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
              <img src={cert} alt="" />
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
        
    </section>
  )
}

export default Header