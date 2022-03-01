import Axios from 'axios'
import React, {useState, useContext} from 'react'

import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import domain from '../../util/domain'

import ErrorMessage from '../misc/ErrorMessage'

import './AuthForm.scss'

function Register(){
    const [formEmail, setFormEmail] = useState('')
    const [formUsername, setFormUsername] = useState('')
    const [formPassword, setFormPassword] = useState('')
    const [formPasswordVerify, setFormPasswordVerify] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser} = useContext(UserContext)

    const navigate = useNavigate()

    async function register(e){
        e.preventDefault()

        const registerData = {
            email: formEmail,
            username: formUsername,
            password: formPassword,
            passwordVerify: formPasswordVerify
        }

        try{
            await Axios.post(`${domain}/auth/register`, registerData)
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
            <h2>Register a new account</h2>
            {errorMessage && (
                <ErrorMessage
                    message={errorMessage}
                    clear={() => setErrorMessage(null)}
                />
            )}

            <form className='form-regLog' onSubmit={register}>
                <div className="line-up">
                    <label htmlFor="form-email">Email:</label>
                    <input 
                        id='form-email'
                        type="email" 
                        value={formEmail}
                        onChange={(e)=> setFormEmail(e.target.value)}
                    />
                </div>

                <div className="line-up">
                    <label htmlFor="form-username">Username:</label>
                    
                    <input 
                        id='form-username'
                        type="text" 
                        value={formUsername}
                        onChange={(e)=> setFormUsername(e.target.value)}
                    />
                </div>

                <div className="line-up">
                    <label htmlFor="form-password">Password:</label>
                    <input 
                        id='form-password'
                        type="password" 
                        value={formPassword}
                        onChange={(e)=> setFormPassword(e.target.value)}
                    />
                </div>
                
                <div className="line-up">
                    <label htmlFor="form-passwordVerify">Verify Password:</label>
                    <input 
                        id='form-passwordVerify'
                        type="password" 
                        value={formPasswordVerify}
                        onChange={(e)=> setFormPasswordVerify(e.target.value)}
                    />
                </div>

                <p>Have an account? <Link to='/login'>Login here</Link></p>

                <button className='btn-submit' type='submit'>Register</button>
            </form>
            
        </div>
    )
}

export default Register