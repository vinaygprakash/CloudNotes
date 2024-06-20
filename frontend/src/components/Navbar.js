import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => { 
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ fontWeight: 'bolder', color: 'white' }} to="/">Notes Here</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {window.localStorage.getItem('token') ? <Link className="btn btn-primary" aria-current="page" to="/notes">Notes</Link>
                  : ''}
                {window.localStorage.getItem('token') ? <Link className="btn btn-primary mx-2" aria-current="page" to="/addnotes">Add Notes</Link>
                  : ''}
                {window.localStorage.getItem('token') ? <Link className="btn btn-primary me-2" aria-current="page" to="/profile">Profile</Link>
                  : ''}
                {!window.localStorage.getItem('token') ? <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link> : ''}
                {!window.localStorage.getItem('token') ? <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link> : <Link to="/login" onClick={() => { localStorage.removeItem("token") }} className="btn btn-primary logoutbtn" role="button">Logout</Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;