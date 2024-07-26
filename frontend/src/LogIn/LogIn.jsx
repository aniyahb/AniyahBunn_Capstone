import './LogIn.css'
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import LoadingScreen from '../Loading/Loading';

function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);




    async function handleLogIn(event){
        event.preventDefault();
        setError(null);
        setIsLoading(true);


        if(!email || !password){
            setError("Fill out both fields")
            return;
        }

        try{
            setIsLoading(true);
            const response = await fetch("http://localhost:2500/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if(response.ok){
                console.log("Logged in user:", data.user);
                localStorage.setItem('token',data.token)
                navigate("/HomePage");

            }else{
                setError(data.error || 'Login failed');
            }
        }   catch(error){
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }   finally{
            setIsLoading(false)
        }
    }

//_________________________________________________________________
    return(
        <>
        <div>
        {isLoading && <LoadingScreen />}

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
                        <button className='logInButton' type="submit" disabled={loading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
            </div>
    </div>
    </div>
</>
    )
}

export default LogIn;
