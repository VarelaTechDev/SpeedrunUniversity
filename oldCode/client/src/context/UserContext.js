import React, {createContext, useEffect, useState} from 'react'

import domain from '../util/domain'

const Axios = require('axios')

const UserContext= createContext()

function UserContextProvider(props) {
    const [user, setUser] = useState(null)

    async function getUser(){
        // ! THIS IS AN ERROR
        const userResId = await Axios.get(`${domain}/auth/loggedIn`)
        // ? At serber > userRouter.js
        // ? Go to router.get('/loggedIn') and set res.json to get more user data
        setUser(userResId.data)
    }

    // * Loading the app will run getUser()
    useEffect(()=>{
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{user, getUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
export {UserContextProvider}