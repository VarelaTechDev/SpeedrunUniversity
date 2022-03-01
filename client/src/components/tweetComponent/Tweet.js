// > The Tweet object that we broke apart to give it its own function
import Axios from 'axios'
import React, {useContext, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'

import {BsReply} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'
import {MdDeleteOutline} from 'react-icons/md'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import './Tweet.scss'

function Tweet({tweetData, getTweetsFunction}){
    
    const {user} = useContext(UserContext)
    
    // ? Why userId??? Where did that come from?
    // * Look at Tweet model and you will see userId, which we populated

    async function deleteTweet(){
        if(window.confirm('Do you want to delete this Tweet?')){
            await Axios.delete(`http://${domain}/tweet/${tweetData._id}`)
        }
        getTweetsFunction()
    }

    async function potusDelete(){
        await Axios.delete(`${domain}/tweet/${tweetData._id}/potus`)
        getTweetsFunction()
    }
    
    // ? Go to tweetRouter.js > router.get('/') to populate Tweets and display user attributes
    return(
        <section className="tweet-section">
            
            <section className='pfp-section'>
                <img className='tweet-pfp' src={tweetData.userId.profilePicture}/>
            </section>
            

            <section className="tweet-glue">
                
                <div className="header">
                    <div className="header-info">
                        <Link to={`/profile/${tweetData.userId.username}`} className='profile-link'>{tweetData.userId.username}</Link>
                        <span className='handleName'>@{tweetData.userId.username}</span>
                    </div>
                    

                    <div className="potus-del-btn">
                        {user && (
                            user.username === 'POTUS' && 
                            (
                                <button className='potus-btn-delete' onClick={potusDelete}>POTUS Delete</button>
                            )
                        )}
                    </div>
                    
                </div>
                
                <div className="message">
                    {tweetData.message}
                </div>
                
                <div className="button-section">
                    
                    <div className="reply-btn-area">
                        <BsReply/>
                    </div>
                    
                    <div className="like-btn-area">
                        <AiOutlineHeart className='like-btn'/><span>0</span> likes
                    </div>

                    <div className="del-btn-area">
                        {user && (
                        
                            user.username === tweetData.userId.username ?
                            
                                <button className='btn-delete' onClick={deleteTweet}>Delete</button>
                                :
                                <button disabled className='hidden-btn-delete' onClick={deleteTweet}>Delete</button>
                        )}
                    </div>
    
                </div>

            </section>

            

            
        </section>
    )
}

export default Tweet