import Axios from 'axios'
import React, {useState, useEffect, createContext, useContext} from "react";
import {Link, Navigate} from 'react-router-dom'

import UserContext from '../../context/UserContext';
import domain from '../../util/domain';

import './ClassInfo.scss'

function ClassInfo({classData, getClassFunction}) {
    const {user, getUser} = useContext(UserContext)
    
    return  (
        <section className='classInfo-section'>
            <p>Test</p>
            {console.log('I EXIST')}
        </section>
    )
};

export default ClassInfo;