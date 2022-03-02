import React, {useState, useEffect, createContext, useContext} from 'react';

import './SingleProfile.scss'
import './EditFormSingleProfile.scss'
import { useNavigate } from 'react-router-dom';
import domain from '../../util/domain';
import UserContext from '../../context/UserContext';


const Axios = require('axios')

function SingleProfile({userData}) {

    const {getUser, user} = useContext(UserContext)
    const [bool, setBool] = useState(false)

    const [edit, setEdit] = useState(false)
    
    const [username, setUsername] = useState(userData.username)
    const [formUsername, setFormUsername] = useState('')
    

    const navigate = useNavigate()

    useEffect(()=>{
        setFormUsername(username)
        console.log(userData)
        console.log(user)
    }, [])

    async function sendEditForm(e){
        e.preventDefault()
        setEdit(false)

        const editData = {
            originalUsername: username,
            newUsername: formUsername
        }

        // ! No error display for the user and doesn't refresh the page
        await Axios.put(`${domain}/auth/${username}`, editData)
        await getUser()
        navigate('/')

        
    }
    
    
    
    return  (
        <section className='profile-section'>
            
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
                    <span>@{userData.username}</span>
                </div>

                <div className='profile-text-section'>
                    <p>Joined [Find the data later]</p>
                </div>
                
                <div className='follow-following-section'>
                    <p></p>
                </div>
            </div>

            

            

            <div className='display-tweets-section'>

            </div>
            
            {!edit ? <></> : 
            <form className='edit-form' onSubmit={sendEditForm}>
                <div className="edit-box">
                    <div className="top-of-box">    
                        <button onClick={()=>{setEdit(false)}}>X</button>
                        <p>Edit Profile</p>
                        <button className='btn-submit' type='submit'>Save</button>
                    </div>                        
                    <div className="edit-form-display">
                        <div className="edit-username-field">
                            <label className='header' htmlFor="form-username">Username: </label>    
                            <input 
                                id='form-username'
                                type="text" 
                                value={formUsername}
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