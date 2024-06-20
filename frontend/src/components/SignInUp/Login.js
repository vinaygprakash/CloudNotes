// import React, { useState,useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// const host = 'http://localhost:3001/api/auth/login'
// //const host = 'https://e-note-book-backend.vercel.app/api/auth/login'

// export default function Login() {
//     let navigate = useNavigate(); // useHistory hooks

//     const [login, setlogin] = useState({ email: "", password: "" });

//     const onchangefun = (event) => {
//         setlogin({ ...login, [event.target.name]: event.target.value })
//     }

//     useEffect(() => {
//       if(window.localStorage.getItem('token'))
//       navigate('/notes');
//     }, [])
    

//     const onsubmitfun = async (event) => {
//         event.preventDefault();
//         document.getElementById('submitbtn').disabled = true;
//         try {
//             let url = `${host}`;
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: login.email, password: login.password })
//             });
//             const json = await response.json();
//             if (json.success) {
//                 window.localStorage.setItem('token', json.token);
//                 setlogin({ email: "", password: "" })
//                 navigate("/notes");
//             } else {
//                 setlogin({ email: "", password: "" })
//                 toast.error('Invalid login credentials',{
//                     theme: "colored",
//                 })
//             }
//         } catch (error) {
            
//         }
//         document.getElementById('submitbtn').disabled = false;
//     }

//     return (
//         <>
//         <ToastContainer/>
//         <Navbar/>
//             {!localStorage.getItem('auth-token') ? <div className="Reg m-auto">
//                 <div className=" p-4 mt-4 mb-4 regestration Login">
//                     <div className="Title" style={{ color: 'white' }}>Sign In</div>
//                     <form onSubmit={onsubmitfun} className="row g-3">
//                         <div className="col-md-12">
//                             <span className="Details">Email</span>
//                             <input type="email" onChange={onchangefun} name="email" value={login.email} autoComplete="off" placeholder="Enter Your Email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                         </div>
//                         <div className="col-md-12">
//                             <span className="Details">Password</span>
//                             <input type="password" onChange={onchangefun} name="password" value={login.password} autoComplete="off" placeholder="Enter Your Password" required className="form-control" id="exampleInputPassword1" />
//                         </div>
//                         <div className="col-12">
//                             <button type="submit" className="btn" id='submitbtn'>Sing In</button>
//                         </div>
//                         <div className="row">
//                             <Link to="/signup" className="links col">Create an Account</Link>
//                             {/* <Link to="/notes" className="links col-2">Skip</Link> */}
//                         </div>
//                     </form>
//                 </div>
//             </div> : <div className="temp">
//                 <div className="row">
//                     <h1>You are already login</h1>
//                     <button className="BTN mx-auto mt-3" onClick={() => { navigate('/addnotes') }} style={{ width: '8rem' }}>Add Notes</button>
//                 </div>
//             </div>}
//         </>
//     )
// }

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';

const host = 'http://localhost:3001/api/auth/login';

const Login = () => {
    let navigate = useNavigate(); // useHistory hooks

    const [login, setLogin] = useState({ email: "", password: "" });

    const onChangeFun = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            navigate('/notes');
        }
    }, [navigate]);

    const onSubmitFun = async (event) => {
        event.preventDefault();
        const submitButton = document.getElementById('submitbtn');
        if (submitButton) {
            submitButton.disabled = true;
        }
        
        try {
            let url = `${host}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: login.email, password: login.password })
            });
            const json = await response.json();
            if (json.success) {
                window.localStorage.setItem('token', json.token);
                setLogin({ email: "", password: "" });
                navigate("/notes");
            } else {
                setLogin({ email: "", password: "" });
                toast.error('Invalid login credentials', {
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Failed to login. Please try again later.', {
                theme: "colored",
            });
        }

        if (submitButton) {
            submitButton.disabled = false;
        }
    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            {!localStorage.getItem('auth-token') ? (
                <div className="Reg m-auto">
                    <div className=" p-4 mt-4 mb-4 regestration Login">
                        <div className="Title" style={{ color: 'white' }}>Sign In</div>
                        <form onSubmit={onSubmitFun} className="row g-3">
                            <div className="col-md-12">
                                <span className="Details">Email</span>
                                <input
                                    type="email"
                                    onChange={onChangeFun}
                                    name="email"
                                    value={login.email}
                                    autoComplete="off"
                                    placeholder="Enter Your Email"
                                    required
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className="col-md-12">
                                <span className="Details">Password</span>
                                <input
                                    type="password"
                                    onChange={onChangeFun}
                                    name="password"
                                    value={login.password}
                                    autoComplete="off"
                                    placeholder="Enter Your Password"
                                    required
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn" id='submitbtn'>Sign In</button>
                            </div>
                            <div className="row">
                                <Link to="/signup" className="links col">Create an Account</Link>
                                {/* <Link to="/notes" className="links col-2">Skip</Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="temp">
                    <div className="row">
                        <h1>You are already logged in</h1>
                        <button className="BTN mx-auto mt-3" onClick={() => { navigate('/addnotes') }} style={{ width: '8rem' }}>Add Notes</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;

