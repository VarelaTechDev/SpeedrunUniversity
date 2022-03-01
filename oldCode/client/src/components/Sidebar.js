import Axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {Link, Navigate} from 'react-router-dom'
import UserContext from '../context/UserContext'

import domain from '../util/domain'

import './Sidebar.scss'

function Sidebar(){
    const navigate = useNavigate()

    return (
        <div className='entire-sidebar'>
            <section className='sidebar-section'>
                <h2>MySRU</h2>
            </section>



        </div>
    )
}

export default Sidebar