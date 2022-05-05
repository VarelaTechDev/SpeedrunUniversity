import React, {useState, useEffect, createContext} from "react";

import { useParams } from "react-router-dom";

import cerf from '../../images/certImg.png'

import back from '../../images/back.png'

import './Certificate.scss'

function Certificate() {

    const {name} = useParams()
    return  (
        <div className="classGrad">
            <h1>Certificate of Completion</h1>
            
            <p className='header'>is hereby awarded to</p>
            
            <p className='name'>{name}</p>

            <p className='botText'>for completing Speedrun University</p>
            <img src={cerf} alt="" />
            
            <p className='sigTextOne'>Maela Zaharinka</p>
            <p className='sigTextTwo'>Signature</p>

        </div>
    )
};

export default Certificate;