import React, {useState, useEffect, createContext} from "react";
import Loading from "../misc/LoadingThing";

import domain from "../../util/domain";
import SingleProfile from './SingleProfile'

import ErrorMessage from "../misc/ErrorMessage";

import { useParams } from "react-router-dom";

const Axios = require('axios')

const UserContext = createContext()



function Profile() {
    const [loading, setLoading] = useState(true)
    const[userRes, setUserRes] = useState(null)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        getProfile()
    }, [])
    

    function setNoProfile(){
        const noUserFound = {
            username: 'No User ):',
            pfp: 'https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg'
        }
        
        return noUserFound
    }


    async function getProfile(){
        console.log({params})
        try{
            const serverUserRes = await Axios
                .get(`${domain}/auth/${params.username}`)
                .then(res => {
                    setUserRes(res.data)

                })
                setLoading(false) 
        } catch(err){
            if(err.response){
                setUserRes(setNoProfile())
                setLoading(false)
                return
            }
            console.log(err)
        }
    }

    return  (
        <div>
            {loading  ? 
                (
                    <Loading/>
                )
                :
                (
                    <SingleProfile
                        userData={userRes}
                    />   
                )    
        
        }
        </div>
    )
};

export default Profile;
