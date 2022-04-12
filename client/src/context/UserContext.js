// > Global [Instance class] that gives us access to variables for our entire application
// ? useContext is the highest parent component that reduces the usage of 'prop drilling'
import React, { createContext, useEffect, useState } from "react";
import domain from '../util/domain'

const Axios = require('axios')
const UserContext = createContext()

// ! We modified it to res.send(existingUser) We have everything
function UserContextProvider(props) {    
    const [user, setUser] = useState(null)

    // ? At server > userRouter.js
    async function getUser(){
        const userResId = await Axios.get(`${domain}/auth/loggedIn`)
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
};

export default UserContext
export {UserContextProvider}