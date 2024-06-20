import React from 'react';
import Noteitem from './Noteitem';
import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getAllnotes, editNotefun } = context;

    const navigate = useNavigate();

    // here we are cheaking if token is stored in localstorage then fetch all notes crossponding to that user else re-direct to logig page
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            getAllnotes();
        } else {
            navigate('/');
        }
    }, []);


    // for edit a note
    const [note, setnote] = useState({ _id: "", title: "", description: "" })
    const refopen = useRef(null)
    const updateNote = (currentNote) => {
        refopen.current.click();
        setnote(currentNote);
    }
    const onchangefun = (event) => {
        setnote({ ...note, [event.target.name]: event.target.value })
    }

    const refclose = useRef(null)
    const onclickfun = (event) => {
        event.preventDefault();
        editNotefun(note._id, note.title, note.description);
        refclose.current.click();
    }

    const [query, setquery] = useState("");
    const [querynotes, setquerynotes] = useState([]);
    useEffect(()=>{
        setquerynotes(notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())));
    },[query])

    return (
        <>
            <Navbar />
            <div className="vinay" style={{ border: '1px solid' }}>
                <button ref={refopen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onclickfun} className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input minLength="1" type="text" value={note.title} className="form-control" id="title" name="title" onChange={onchangefun} required aria-describedby="emailHelp" />
                                    </div>
                                    
                                    {/*<div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onchangefun} aria-describedby="emailHelp" />
                                    </div>*/}
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">Description</label>
                                        <input minLength="1" type="text" value={note.description} className="form-control" name="description" id="description" onChange={onchangefun} required />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Update Note</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-4 my-4">
                    <div className="row text-center mb-3">
                        <h1>Your Notes</h1>
                    </div>
                    <div className="row mb-4 searchbar">
                        {notes.length > 0 ? <input type="text" placeholder='Search by Tittle' value={query} onChange={(e) => { setquery(e.target.value) }} /> : <h3 style={{ textAlign: 'center', color: 'white' }}>No notes to display</h3>}
                    </div>
                    <div className="col-mt-3 text-center">
                        {localStorage.getItem('token') ? <button className="BTN text-center" onClick={() => { navigate('/addnotes') }}>Add New Notes</button> :
                            <button className="BTN text-center" onClick={() => { navigate('/login') }}>Login</button>}
                    </div>
                    <div className="row my-2 p-2">
                        {(notes.length > 0 && query === "") ? notes.map((note) => { return <Noteitem key={note._id} temp={note} updatenote={updateNote} /> }) : ''}
                        {(querynotes.length > 0 && query !== "") ? querynotes.map((item) => {
                            return <Noteitem key={item._id} temp={item} updatenote={updateNote} />
                        }) : ''}
                        {(query!=="" && querynotes.length==0)?<h3 className='mt-4' style={{ textAlign: 'center', color: 'white' }}>No matching notes</h3>:''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes;