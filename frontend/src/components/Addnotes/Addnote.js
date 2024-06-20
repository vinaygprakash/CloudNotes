// import React from 'react'
// import NoteContext from '../../context/notes/NoteContext'
// import '../Addnotes/addnotes.css'
// import { useState, useContext,useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import Navbar from '../Navbar';

// // export default function Addnote() {
//  function Addnote(){
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (!window.localStorage.getItem('token')) {
//             navigate('/');
//         }
//     }, [])
//     const context = useContext(NoteContext);
//     const { AddNotefun } = context;

//     const [note, setnote] = useState({ title: "", description: "" })
//     const onchangefun = (event) => {
//         setnote({ ...note, [event.target.name]: event.target.value })
//     }

//     const onclickfun = (event) => {
//        // document.getElementById('submitbtn').disabled = true;
//         event.preventDefault();
//         AddNotefun(note.title, note.description)
//         setnote({ title: "", description: "" });
//         navigate('/notes');
//       //  document.getElementById('submitbtn').disabled = false;
//     }

//     // const handleClick = (e)=>{
//     //     e.preventDefault();
//     //     addNote(note.title, note.description, note.tag);
//     //     setNote({title: "", description: "", tag: ""})
//     // }

//     // const onChange = (e)=>{
//     //     setNote({...note, [e.target.name]: e.target.value})
//     return (
//         <>
//             <Navbar />
//             <div className="alok" style={{ border: '1px solid' }}>
//                 <div className="addNotes">
//                     <h1>Add a Note</h1>
//                     <form onSubmit={onclickfun}>
//                         <div className="mb-3">
//                             <label htmlFor="title" className="form-label">Title</label>
//                             <input type="text" minLength="1" value={note.title} className="form-control fw-bold" id="title" name="title" onChange={onchangefun} required aria-describedby="emailHelp" />
//                         </div>
//                         {/*<div className="mb-3">
//                             <label htmlFor="tag" className="form-label">Tag</label>
//                             <input autoComplete="off" type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onchangefun} aria-describedby="emailHelp" />
//                         </div>*/}
//                         <div className="mb-3">
//                             <label htmlFor="desc" className="form-label">Description</label>
//                             {/*<input autoComplete="off" type="text" minLength="1" value={note.description} className="form-control" name="description" id="description" onChange={onchangefun} required />*/}
//                             <textarea autoComplete="off" type="text" rows={5} minLength="1" value={note.description} className="form-control" name="description" id="description" onChange={onchangefun} required />
//                         </div>
//                         <button type="submit" id='submitbtn' className="BTN">Add</button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Addnote;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NoteContext from '../../context/notes/NoteContext';
import Navbar from '../Navbar';
import '../Addnotes/addnotes.css';

function Addnote() {
    const navigate = useNavigate();
    
    // Redirect to home if no token is found
    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);
    
    const context = useContext(NoteContext);
    const { AddNotefun } = context;

    const [note, setNote] = useState({ title: "", description: "" });

    const onChangeFun = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    const onClickFun = (event) => {
        event.preventDefault();
        AddNotefun(note.title, note.description);
        setNote({ title: "", description: "" });
        navigate('/notes');
    };

    return (
        <>
            <Navbar />
            <div className="vinay" style={{ border: '1px solid' }}>
                <div className="addNotes">
                    <h1>Add a Note</h1>
                    <form onSubmit={onClickFun}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                minLength="1"
                                value={note.title}
                                className="form-control fw-bold"
                                id="title"
                                name="title"
                                onChange={onChangeFun}
                                required
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                autoComplete="off"
                                rows={5}
                                minLength="1"
                                value={note.description}
                                className="form-control"
                                name="description"
                                id="description"
                                onChange={onChangeFun}
                                required
                            />
                        </div>
                        <button type="submit" id='submitbtn' className="BTN">Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addnote;

