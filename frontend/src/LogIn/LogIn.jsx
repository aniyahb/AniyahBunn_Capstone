import './LogIn.css'
import React, { useState, useContext, createContext} from "react";
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"


function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    async function handleLogIn(event){
        event.preventDefault();
        if(!email || !password){
            setError("Fill out both fields")
            return;
        }

        try{
            setLoading(true);
            console.log('Sending login request');
            const response = await fetch("http://127.0.0.1:2500/logIn",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email,
                    password,
                }),
            });
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log(response)

            if (response.ok) {
                if (data.token) {
                    console.log('Token Received');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate("/HomePage")
                    } else {
                        console.log('No token in response');
                        setError('Login successful, but no token received');
                    }
                } else {
                    console.log
                    setError('Login Failed')
                }
                } catch (error) {
                    console.error('Login error:', error);
                    setError('An error occurred');
                    } finally {
                    setLoading(false);
                    }
                }
//_________________________________________________________________
    return(
        <div className='logInBody'>
            <div className="logInTitle">MealMaster</div>
            <div className='logInContainer'>
                <div className='logInHeader'>
                    <div className="logInLable">Login</div>
                    <div className="logInUnderline"></div>
                </div>
                    <form onSubmit={handleLogIn}>
                        <div className='logInInputs'>

                            <input
                                type='email'
                                placeholder='Email'
                                value= {email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type='password'
                                placeholder='Password'
                                value= {password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className='error'>{error}</div>}
                        <p className='newAccount'>
                            Don't have an account?{' '}
                            <Link to= "/signUp" className='signUpLink'>
                                Sign Up
                            </Link>
                        </p>
                        <button className='logInButton' onClick={handleLogIn} disabled={loading}>
                            Login
                        </button>
                    </form>
            </div>
    </div>

    )
}

export default LogIn;
