import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function Noteitem(props) {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { deleteNotefun } = context;
    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate('/');
        }
    }, [])
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3" style={{ border: "1px solid gray", background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))' }}>
                    <div className="card-body" style={{ color: 'white' }}>
                        <h4 className="card-title">{props.temp.title}</h4>
                        <p style={{ opacity: '0.5' }}>{props.temp.description}</p>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNotefun(props.temp._id) }}></i>
                        <i className="fas fa-edit mx-2" onClick={() => { props.updatenote(props.temp) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}