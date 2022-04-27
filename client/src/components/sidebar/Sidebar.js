// > Entire sidebar that holds links to other parts of the site
// ? Profile/Blackboard is limited if the user is not logged in
import Axios from 'axios'
import React, {useContext} from 'react'
import {useNavigate} from 'react-router'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'

import domain from '../../util/domain'

import './Sidebar.scss'

import {BsPerson} from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
import {GiBlackBook} from 'react-icons/gi'


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
                    
                    <div className="homeBtnDiv">
                        <Link to='/' className='homeBtn'>
                            <FaHome className='icon'/>
                            <span>Home</span>
                        </Link> 
                    </div>

                    
                    <div className="profileBtnDiv">
                        {user === null || user.username === null ? 
                            (
                                <Link to='register' className='profileBtn'>                                    
                                    <BsPerson className='icon'/><span>Profile</span>                            
                                </Link>
                            )
                            : 
                            (
                                <Link to={`/profile/${user.username}`} className='profileBtn'>
                                    <BsPerson  className='icon'/><span>Profile</span>
                                </Link>
                            )
                        }
                    </div>

                    <div className='blackboardBtnDiv'>
                        {user === null || user.username === null ?
                            (
                                <Link to='register' className='blackboardBtn'>
                                    <GiBlackBook className='icon'/><span>Blackboard</span>
                                </Link>
                            )
                            :
                            (
                                <Link to='/blackboard' className='blackboardBtn'>
                                    <GiBlackBook className='icon'/><span>Blackboard</span>
                                </Link>
                            )
                        }
                    </div>
                </section>
            </div>
            
            
            <div className='sidebar-authlist'>
                {user === null || user.username === null ? 
                    (
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
                    
                    )
                    :
                    (
                        <section className="log-out-section">    
                            <div className="mini-user-info">
                                <div className="username-section">
                                    <span className='logout-username'>{user.username}</span>
                                </div>

                                <div className="mini-logout">
                                    <button className='btn-logout' onClick={logout}>
                                        <p>Log out</p>
                                    </button>    
                                </div>
                                
                            </div>
                        </section>

                    )
                }
            </div>
        </div>
    )
}

export default Sidebar