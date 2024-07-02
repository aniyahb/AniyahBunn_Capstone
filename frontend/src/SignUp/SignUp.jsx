import './SignUp.css'
import React, { useContext, useState } from "react";
import {useNavigate,Link} from "react-router-dom"
import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'


function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {updateUser} = useContext(UserContext)


    async function handleSignUp(event){
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:2500/logIn",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:Json.stringify({
                    name,
                    email,
                    password,
                    confirmPassword,
                    role,
                }),
                credentials: 'include'
            });
            const data = await response.json()
            if(response.ok){
                const loggedInUser = data.user
                updateUser(loggendInUser)
                navigate('/projects')
            } else{
                setError('Login failed')
            }
            if (data.error){
                alert(data.error)
            }
    }       catch(error){
            console.log(error)
    }
}
    function goToLogin(){
        navigate('/logIn')
    }

//_________________________________________________________________

    return(
        <div className='signUpBody'>
            <div className="signUpTitle">MealMaster</div>
            <div className='signUpContainer'>
                <div className='signUpHeader'>
                    <div className='signUpLable'>Sign Up</div>
                    <div className="signUpUnderline"></div>
                </div>
                    <form onSubmit={handleSignUp}>
                    <div className='signUpInputs'>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        <img src={email_icon} alt=""/>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        <img src={password_icon} alt=""/>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        <img src={password_icon} alt=""/>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                    </div>
                        <p className='existingccount'>
                            Already Have An Account?{' '}
                            <a className='logInLink' onClick={goToLogin}>
                                Login
                            </a>
                        </p>
                        <button className='signUpButton'>Get Started</button>
                    </form>
                </div>

    </div>
    )

}

export default SignUp;
