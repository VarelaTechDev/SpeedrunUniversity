import Axios from 'axios'
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import ErrorMessage from '../misc/ErrorMessage'

import './AuthForm.scss'

function Login(){
    const [formEmail, setFormEmail] = useState('')
    const [formPassword, setFormPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser} = useContext(UserContext)

    const navigate = useNavigate()

    async function login(e){
        e.preventDefault()

        const loginData = {
            email: formEmail,
            password: formPassword,
        }

        try{
            await Axios.post(`${domain}/auth/login`, loginData)
        }catch(err){
            if(err.response){
                setErrorMessage(err.response.data.errorMessage)
            }    
            return
        }

        await getUser()
        navigate('/')
    }


    return (
        <div className="auth-form">
            <h2>Log in</h2>
            {errorMessage && (
                <ErrorMessage
                    message={errorMessage}
                    clear={() => setErrorMessage(null)}
                />
            )}

            <form className='form-regLog' onSubmit={login}>
                <label htmlFor="form-email">Email</label>
                <input 
                    id='form-email'
                    type="email" 
                    value={formEmail}
                    onChange={(e)=> setFormEmail(e.target.value)}
                />

                <label htmlFor="form-email">Password</label>
                <input 
                    id='form-password'
                    type="password" 
                    value={formPassword}
                    onChange={(e)=> setFormPassword(e.target.value)}
                />
                
                <p>Don't have an account? <Link to='/register'>Register here</Link></p>
                
                <button className='btn-submit' type='submit'>Login</button>
            </form>
            
        </div>
    )
}

export default Login