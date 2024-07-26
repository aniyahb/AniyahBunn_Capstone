import './Profile.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
};
    return (
        <button className="profileButton" onClick={handleLogout}>Logout</button>
);
};
export default Profile;
