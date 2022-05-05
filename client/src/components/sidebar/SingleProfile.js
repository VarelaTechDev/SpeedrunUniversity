// TODO: Fix the router when you send updated data to the server and add the hooks, fix the regist page, and etc
// > This is a child component for Profile.js
// ? We pass the info into this component and use the info to display it to the user
import React, {useState, useEffect, useContext} from 'react';

import './SingleProfile.scss'
import './EditFormSingleProfile.scss'

import ErrorMessage from '../misc/ErrorMessage'

import { Link, useNavigate } from 'react-router-dom';
import domain from '../../util/domain';
import UserContext from '../../context/UserContext';
import DisplayGrades from './DisplayGrades';

const Axios = require('axios')

function SingleProfile({userData}) {
    const {getUser, user} = useContext(UserContext)


    const [edit, setEdit] = useState(false)
    
    // TODO: Need to add pronouns and profile banner when you register and edit register routes
    const [username, setUsername] = useState(userData.username)
    const [profilePicture, setProfilePicture] = useState(userData.profilePicture)
    
    const [profileBanner, setProfileBanner] = useState(userData.profileBanner)

    const[pronouns, setPronouns] = useState(userData.pronouns)
    
    const [formUsername, setFormUsername]   = useState('')
    const [formProfilePicture, setFormProfilePicture] = useState('')
    const [formProfileBanner, setFormProfileBanner] = useState('')
    const [formPronouns, setFormPronouns] = useState('')

    const[reportCardData, setReportCardData] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        
        
        getUser()
        
        setFormUsername(username)
        setFormProfilePicture(profilePicture)
        setFormProfileBanner(profileBanner)
        setFormPronouns(pronouns)
        
        const getReportCard = async() => {
            const response = await Axios.get(`${domain}/auth/reportCard/${username}`)
            console.log(response.data)
            setReportCardData(response.data.courses)
        }

        getReportCard()
        console.log(reportCardData)
        
    }, [])

    function goToGrad(){
        navigate(`/grad/${user.name}`)
    }

    async function sendEditForm(e){
        e.preventDefault()
        
        setEdit(false)

        const editData = {
            originalUsername: username,
            newUsername: formUsername,

            originalPFP: profilePicture,
            newPFP: formProfilePicture,

            oldBanner: profileBanner,
            newBanner: formProfileBanner,

            oldPronouns: pronouns,
            newPronouns: formPronouns,

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


            {/* https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffiles.yande.re%2Fimage%2F327e37f67fd8d79c77a46b5bcc67db80%2Fyande.re%2520691872%2520animal_ears%2520cleavage%2520hololive%2520minato_aqua%2520nekomimi%2520pantyhose%2520seifuku%2520skirt_lift%2520tagme%2520tail%2520undressing.jpg&f=1&nofb=1 */}
            {/* https://i.pinimg.com/originals/d3/e2/68/d3e268778a77cc1df25d03f004956da3.png */}
            <div className='profile-info-section'>
                <div className="profile-name">
                    <span className='name'>{userData.username}</span>
                </div>

                <div className='profile-text-section'>
                    <h1>Basic Info</h1>
                    <span className='infoTitle'>Full Name:</span><span className='info'>{userData.name}</span><br></br>
                    <span className='infoTitle'>Email Address:</span> <span className='info'>{userData.email}</span><br></br>
                    <span className='infoTitle'>Pronouns:</span> <span className='info'>{userData.pronouns}</span>
                </div>
                
                <div className='report-card'>
                    <h1>Report Card</h1>
                    {reportCardData == '' ? 
                        (console.log("Empty"))
                        :
                        (
                            reportCardData.map((item, i) => {
                                return <DisplayGrades key={i} grades={item}/>
                            })
                            // <div className="reportCard">
                                // {console.log('Populated')}
                                // {console.log(reportCardData)}
                                

                            

                        )
                
                    }
                </div>

                <div className='gradDiv'>
                    {reportCardData.length >= 4 ?
                        // <Link to ={`/grad/${user.name}`}>Grad</Link>
                        <button onClick={goToGrad}>Graduate</button>
                        
                        :
                        <></>
                    }
                    
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
                            <label className='header' htmlFor="form-pfp">Profile Picture: </label>    
                            <input 
                                id='form-pfp'
                                type="text" 
                                value={formProfilePicture}
                                onChange={(e)=> setFormProfilePicture(e.target.value)}
                            />
                        </div>

                        <div className="edit-banner">
                            <label className='header' htmlFor="form-banner">Profile Banner: </label>    
                            <input 
                                id='form-banner'
                                type="text" 
                                value={formProfileBanner}
                                onChange={(e)=> setFormProfileBanner(e.target.value)}
                            />
                        </div>

                        <div className="edit-pronouns">
                            <label className='header' htmlFor="form-pronouns">Pronouns: </label>    
                            <input 
                                id='form-pronouns'
                                type="text" 
                                value={formPronouns}
                                onChange={(e)=> setFormPronouns(e.target.value)}
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