import React, { useContext, useState } from "react";
import './LogInSignUp.css'
import {useNavigate,Link} from "react-router-dom"
// import {UserContext} from "../../UserContext"


import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

const LogInSignUp = () =>{
    const [action,setAction] = useState('Sign Up');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate

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
                updateUser(loggedInUser);
                navigate('/projects')
            }else{
                setError('Login Failed')
            }
        }   catch(error){
            setError('An error occured');
        }   finally{
            setLoading(false)
        }
    }



//____________________________UI_____________________________________
    return(
        <div className='body'>
            <div className="title">MealMaster</div>
        <div className="container">
            <div className='header'>
                <div className="lable">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="SignUp-inputs">
                {action==="Login"?
                <div></div>:
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="text" placeholder="Name" />
                </div>
}
                <div className="input">
                    <img src={email_icon} alt=""/>
                    <input type="email" placeholder="Email"/>
                </div>

                <div className="input">
                    <img src={password_icon} alt=""/>
                    <input type="password" placeholder="Password" />
                </div>

                {action !=="Sign Up" &&
                <div className="ForgotPassword">Forgot Password <span>Click Here!</span></div>}
                <div className="submit-container">
                    <button className="signUpButton"><div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div></button>
                    <button className="logInButton"><div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div></button>


                </div>
            </div>
        </div>
        </div>


    )

}

export default LogInSignUp;
