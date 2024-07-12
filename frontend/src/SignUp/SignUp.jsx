import './SignUp.css'
import React, { useContext, useState } from "react";
import {useNavigate,Link,Router} from "react-router-dom"



function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')



    async function handleSignUp(event){
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            alert(error)
            return;
        }



        try{
            const response = await fetch("http://localhost:2500/signUp",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword,
                }),
                credentials: 'include'
            });
            console.log(response)
            const data = await response.json()
            if(response.ok){
                goToHomepage()
            } else{
                setError('Registration failed')
                alert(error)
            }
            if (data.error){
                console.log(data.error)
                setError(data.error);
                alert(data.error)
            }
    }       catch(error){
            console.log(error)
            setError(data.error);
            alert(data.error)
            }
    }

    function goToLogin(){
        navigate('/logIn')
    }

    function goToHomepage(){
        navigate('/HomePage')
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
                    </div>

                    <div className='signUpInputs'>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </div>

                    <div className='signUpInputs'>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </div>

                    <div className='signUpInputs'>
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
                        <button className='signUpButton'>Sign Up</button>
                    </form>
                </div>

    </div>
    )

    }

export default SignUp;
