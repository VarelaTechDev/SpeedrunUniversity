// > <Route path='profile/:username' element={<Profile/>}/>
import React, {useContext} from "react";

import SingleProfile from './SingleProfile'
import UserContext from '../../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)

    return  (
        <div>
            <SingleProfile userData={user}/>   
        </div>
    )
};

export default Profile;