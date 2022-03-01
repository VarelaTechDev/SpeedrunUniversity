import Axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Link, Navigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'


import domain from '../../util/domain'
import Register from '../auth/Register'

import './Sidebar.scss'

import {BsTwitter, BsBell, BsEnvelopeOpen, BsPersonFill, BsPerson} from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
import {HiOutlineHashtag} from 'react-icons/hi'

function Sidebar(){
    const navigate = useNavigate()    
    const {user, getUser} = useContext(UserContext)

    async function logout(){
        await Axios.get(`${domain}/auth/logout`)
        await getUser()
        navigate('/')
    }
    
    return (
        <div className='entire-sidebar'>
            
            <div className='sidebar-interactive'>
                
                <section className='icons'>
                    <div className="home-btn">
                        <Link to='/' className='home-link' style={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'gray'
                        }}>
                            <FaHome className='icon'/>
                            <span>Home</span>
                        </Link> 
                    </div>

                    <div className="profile-btn">
                        {user === null || user.username === null ? 
                            (
                            <Link to='register' className='profile-link'
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'gray'
                            }}>
                                    <BsPerson className='icon'/><span>Profile</span>                            
                            </Link>
                            )
                            : 
                            (
                                <Link to={`/profile/${user.username}`} className='profile-link'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: 'gray'
                                }}>
                                    <BsPerson  className='icon'/><span>Profile</span></Link>   
                        )}
                    </div>
    
                </section>
                
            </div>
            
            
            <div className='sidebar-authlist'>
                {user === null || user.username === null? (
                    <section className='log-in-section'>
                        
                        
                        <Link to='register' className='register' id='regBtn' style={{textDecoration: 'none'}}>
                            <div className="register-area" id='regBtn'>
                                <span id='regBtn'>Sign up with email</span>
                            </div>
                        </Link>
                        


                        <Link to='login' className='login' style={{textDecoration: 'none'}}>
                            <div className="login-area">
                                <span>Sign in</span>
                            </div>            
                        </Link>    
                    </section>
                    
                ):(
                    <section className="log-out-section">
                        {user && 
                            <div className="mini-user-area">
                                
                                <div className="mini-pfp">
                                    <img src={user.profilePicture} alt="" />
                                </div>


                                <div className="mini-user-info">
                                    <div className="username-section">
                                        <span className='logout-username'>@{user.username}</span>
                                    </div>
                                    <div className="mini-logout">
                                        <button className='btn-logout' onClick={logout}>
                                            <p>Log out</p>
                                        </button>    
                                    </div>
                                </div>
                                
                            </div>   
                        }
                    </section>
                    
                    
                )}
            </div>

        </div>
    )
}

export default Sidebar