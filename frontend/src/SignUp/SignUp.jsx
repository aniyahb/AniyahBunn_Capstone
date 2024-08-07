import './SignUp.css'
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Footer from '../Footer/Footer';

function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSignUp(event){
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            alert(error)
            return;
        }

        try{
            const response = await fetch("http://localhost:2500/signup",{
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

            const data = await response.json();
            console.log(response)
            if (response.ok) {
                alert('Welcome to MealMaster! Please login.');
                navigate('/LogIn');
            } else {
                if (data.error === 'Email already exists. Please login.') {
                    alert('This email is already registered. Please log in instead.');
                    navigate('/logIn');
                } else {
                    setError(data.error || 'Registration failed');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('An error occurred during signup');
        }
    }
    function goToLogin(){
        navigate('/logIn')
    }

    return(
        <div className="page-container">
        <div className="content-wrap">
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

                            <p className='existingAccount'>
                                Already Have An Account?{' '}
                                <a className='logInLink' onClick={goToLogin}>
                                    Login
                                </a>
                            </p>
                            <button className='signUpButton'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

        )

    }

export default SignUp;
