import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';

import { ToastContainer, toast } from 'react-toastify';
const host = 'https://cloud-notes-backend-mocha.vercel.app/api/auth/createuser'
//const host='http://localhost:3001/api/auth/createUser'

export default function Signup() {
    let navigate = useNavigate(); // useNavigate hooks

    const [signup, setsignup] = useState({ name: "", email: "", password: "" });

    const onchangefun = (event) => {
        if (event.target.name === "name")
            event.target.value = event.target.value.toUpperCase()
        setsignup({ ...signup, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        if (window.localStorage.getItem('token'))
            navigate('/notes');
    }, []);

    const onsubmitfun = async (event) => {
        document.getElementById('submitbtn').disabled = true;
        event.preventDefault();
        let url = `${host}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: signup.name, email: signup.email, password: signup.password })
        });
        const json = await response.json();
        if (json.success) {
            setsignup({ name: "", email: "", password: "" })
            navigate('/login');
        } else {
            toast.error(json.errors, {
                theme: "colored"
            })
            setsignup({ name: "", email: "", password: "" })
        }
        document.getElementById('submitbtn').disabled = false;
    }


    return (
        <>
            <ToastContainer />
            <Navbar />
            {!localStorage.getItem('item') ? <div className="Reg">
                <div className=" p-4 mt-4 mb-4 regestration">
                    <div className="Title" style={{ color: 'white' }}>Sign Up</div>
                    <form className="row g-3" onSubmit={onsubmitfun}>
                        <div className="col-12">
                            <span className="Details">Full Name</span>
                            <input onChange={onchangefun} minLength="3" value={signup.name} type="text" className="form-control" placeholder="Enter Your Name" name="name" autoComplete="off" required />
                        </div>
                        <div className="col-12">
                            <span className="Details">Email</span>
                            <input onChange={onchangefun} value={signup.email} type="email" className="form-control" id="inputEmail4" name="email" placeholder="Enter Your Email" autoComplete="off" required="true" />
                        </div>
                        <div className="col-12">
                            <span className="Details">Password</span>
                            <input onChange={onchangefun} minLength="5" value={signup.password} type="password" className="form-control" name="password" id="inputPassword4" placeholder="Enter Your Password" autoComplete="off" required />
                        </div>
                        <div className="col-12">
                            <button type="submit" name="signup" value="Regester" id='submitbtn' className="btn">Sign Up</button>
                        </div>
                    </form>
                    <div className="row">
                        <Link to="/login" className="links col">Login</Link>
                        {/* <Link to="/notes" className="links col-2">Skip</Link> */}
                    </div>
                </div>
            </div> : <div className="temp">
                <div class="row">
                    <h1>You are already login</h1>
                    <button className="BTN mx-auto mt-3" onClick={() => { navigate('/addnotes') }} style={{ width: '8rem' }}>Add Notes</button>
                </div>
            </div>}
        </>
    )
}
