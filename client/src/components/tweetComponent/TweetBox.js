import React, {useState, useEffect, useContext} from "react";
import './TweetBox.scss'
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

const Axios = require('axios')

function TweetBox({getTweetsFunction: getTweets}) {
    
    const[tweetMessage, setTweetMessage] = useState('')

    const [didSubmit, setDidSubmit] = useState(false)
    
    const {user} = useContext(UserContext)
    

    useEffect(()=>{
        setTweetMessage('')
        setDidSubmit(false)
    }, [didSubmit])

    async function submitTweet(e){
        e.preventDefault()
        // console.log(user)
        const tweetData = {
            header: user.validatedUser_id,
            message: tweetMessage
        }
        
        try{
            await Axios.post(`${domain}/tweet`, tweetData)
            setDidSubmit(true)
        }catch(err){
            return
        }

        getTweets()
    }
    
    return  (
            <form className='form' onSubmit={submitTweet}>
                    <section className="pfp-section">
                        <img className='tweet-pfp' src={user.profilePicture} alt="" />
                    </section>
                    
                    <section className="text-section">
                        <textarea
                            className='tweet-message' 
                            value={tweetMessage} 
                            placeholder="What's happening?"
                            onChange={(e)=> setTweetMessage(e.target.value)}
                            maxLength='316'
                        />

                        <div className="misc">
                            <button className='btn-submit' type='submit'>Tweet</button>
                        </div>

                    </section>

                    
                
            </form>
        
    )
};

export default TweetBox;