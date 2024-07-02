import './LogIn.css'
import React, { useState, useContext, createContext} from "react";
import {useNavigate,Link} from "react-router-dom"
// import  {UserContext}  from '../UserContext'
import password_icon from '../assets/password.png'
import email_icon from '../assets/email.png'

function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const {updateUser} = useContext(UserContext);




    async function handleLogIn(event){
        event.preventDefault();
        if(!email || !password){
            setError("Fill out both fields")
            return;
        }

        try{
            setLoading(true);
            const response = await fetch("http://localhost:2500/logIn",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:Json.stringify({
                    email,
                    password,
                }),
                credentials: 'include'
            });
            if(response.ok){
                const data = await response.json();
                const loggedInUser = data.user;
                // updateUser(loggedInUser);
            }else{
                setError('Login Failed')
            }
        }   catch(error){
            setError('An error occured');
        }   finally{
            setLoading(false)
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
                            <img src={email_icon} alt=""/>
                            <input
                                type='email'
                                placeholder='Email'
                                value= {email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <img src={password_icon} alt=""/>
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
