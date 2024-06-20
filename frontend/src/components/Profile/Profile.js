import './profile.css';
import Navbar from "../Navbar";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const host = 'http://localhost:3001/api/auth/getuser'

const Profile = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState({ 'name': ' ', 'email': '' });
    const fetchuser = async () => {
        try {
            const response = await fetch(host, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': window.localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setuser(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            fetchuser();
        } else {
            navigate('/');
        }
    }, [])

    return (
        <>
            <div className="vinay">
                <Navbar />
                <div className="container py-4 my-4">
                    <div className="row text-center mb-3">
                        <h1 className='mb-4'>Your Profile</h1>
                        <div className="profile">
                            <div className="profilediv">
                                <p>Username : <span>{user.name}</span></p>
                                <p>Email : <span>{user.email}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;