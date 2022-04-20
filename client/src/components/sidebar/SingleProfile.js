// TODO: Fix the router when you send updated data to the server and add the hooks, fix the regist page, and etc
// > This is a child component for Profile.js
// ? We pass the info into this component and use the info to display it to the user
import React, {useState, useEffect, useContext} from 'react';

import './SingleProfile.scss'
import './EditFormSingleProfile.scss'

import ErrorMessage from '../misc/ErrorMessage'

import { useNavigate } from 'react-router-dom';
import domain from '../../util/domain';
import UserContext from '../../context/UserContext';

const Axios = require('axios')

function SingleProfile({userData}) {
    const {getUser, user} = useContext(UserContext)


    const [edit, setEdit] = useState(false)
    
    const [username, setUsername] = useState(userData.username)
    const [formUsername, setFormUsername]   = useState('')
    
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        setFormUsername(username)
    }, [])

    async function sendEditForm(e){
        e.preventDefault()
        
        setEdit(false)

        const editData = {
            originalUsername: username,
            newUsername: formUsername
        }

        try{
            await Axios.put(`${domain}/auth/${username}`, editData)
        }catch(err){
            if(err.response){
                setErrorMessage(err.response.data.errorMessage)
            }
            return
        }
        
        await getUser()
        navigate('/')
    }
    
    return  (
        <section className='profile-section'>
            {errorMessage && (
                <ErrorMessage
                    message={errorMessage}
                    clear={() => setErrorMessage(null)}
                />
            )}
            
            <div className='profile-background-area'>
                <img className='profile-background-img' src={userData.profileBanner} alt='' />
            </div>

            <div className='profile-picture-section'>
                <img className='profile-picture' src={userData.profilePicture} alt='' />
                {user && (
                    userData.username === user.username && (
                        <button className='edit-button' onClick={()=>{setEdit(true)}}>Edit profile</button>
                    )
                )}
            </div>


            <div className='profile-info-section'>
                <div className="profile-name">
                    <span className='name'>{userData.username}</span>
                </div>

                <div className='profile-text-section'>
                    <h1>Basic Info</h1>
                    <p>Full Name</p>
                    <p>Email Address</p>
                    <p>Pronouns</p>
                </div>
                
                <div className='report-card'>
                    <h1>Report Card</h1>
                    
                </div>

            </div>
            
            {!edit ? <></> : 
            <form className='edit-form' onSubmit={sendEditForm}>
                <div className="edit-box">
                    
                    <div className="top-of-box">    
                        <button className='x' onClick={()=>{setEdit(false)}}>X</button>
                        <p>Edit Profile</p>
                        <button className='btn-submit' type='submit'>Save</button>
                    </div>                        
                    
                    {/* EDIT FORM */}
                    <div className="edit-form-display">
                        
                        <div className="edit-username">
                            <label className='header' htmlFor="form-username">Username: </label>    
                            <input 
                                id='form-username'
                                type="text" 
                                value={formUsername}
                                onChange={(e)=> setFormUsername(e.target.value)}
                            />
                        </div>

                        <div className="edit-pfp">
                            <label className='header' htmlFor="form-username">Profile Picture: </label>    
                            <input 
                                id='form-username'
                                type="text" 
                                value={formUsername}
                                onChange={(e)=> setFormUsername(e.target.value)}
                            />
                        </div>

                        <div className="edit-banner">
                            <label className='header' htmlFor="form-username">Profile Banner: </label>    
                            <input 
                                id='form-username'
                                type="text" 
                                value="bannerLink"
                                onChange={(e)=> setFormUsername(e.target.value)}
                            />
                        </div>

                        <div className="edit-pronouns">
                            <label className='header' htmlFor="form-username">Pronouns: </label>    
                            <input 
                                id='form-username'
                                type="text" 
                                value="He/She"
                                onChange={(e)=> setFormUsername(e.target.value)}
                            />
                        </div>

                    </div>
                </div>                        
            </form>
            }        
        </section>
    )
};

export default SingleProfile;