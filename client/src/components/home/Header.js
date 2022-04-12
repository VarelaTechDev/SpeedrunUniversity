import React from 'react'

import mysrupic from '../../images/mysrupic.png'

function Header() {
  return (
    <section className='header'>
        <img src={mysrupic} alt="" />

        <div className='campus_announcements_header'>
            <h2>Campus Announcements</h2>
        </div>

        <div className='campus_text'>
            <b>Disabled Accounts for Non-Continuing Students</b>
            <p>
            The University began to de-commission CSUDH Student network and toroMail accounts of students who have not been enrolled in the 
            campus or graduated for more than two (2) years, have no active application with the University, 
            and is not a member of the CSUDH Alumni Association. These accounts will be disabled as part of our Identity Management Project.
            </p>

            
        </div>
        
    </section>
  )
}

export default Header