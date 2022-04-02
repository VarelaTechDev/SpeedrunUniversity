import React from 'react'
import { Link } from 'react-router-dom'

import './ClassComp.scss'

function ClassComp({classId, classNum, className, professorName}) {
  return (
        <div className='class'>
            <Link to={`/class/${classId}`}
            style={{
                color: 'black'
            }}
            >
                <h3>{classNum}</h3>
                
                <h4>{className}</h4>

                <h5>{professorName}</h5>  
            </Link>
        </div>
  )
}

export default ClassComp