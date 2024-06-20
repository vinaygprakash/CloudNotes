import NoteContext from './NoteContext';
import { useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';

const NoteState = (props) => {
  const host = "https://cloudnotes-1.onrender.com";

  const [notes, setnotes] = useState([]);


  // get all notes  by the help of user id
  const getAllnotes = async () => {
    try {
      if (window.localStorage.getItem('token')) {
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': window.localStorage.getItem('token')
          }
        });
        const json = await response.json();
        json.notes.reverse();
        setnotes(json.notes);
      } else {
        setnotes([]);
      }
    } catch (error) {
      console.log("inside getallnotes", error);
    }
  }


  //add a note
  // const AddNotefun = async (title, description) => {
  //   const url = `${host}/api/notes/addnotes`;
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': window.localStorage.getItem('token')
  //     },
  //     body: JSON.stringify({ title, description })
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to add note');
  //   }
  //   const note = await response.json();

  //   toast.success('Note has been added',{theme:'colored','autoClose':2000});
  //   // for user site or frontend
  //   // setnotes(notes.concat(note));
  //   // setnotes(notes.unshift(note));
  //   getAllnotes();
  // }
  // const AddNotefun = async (title, description) => {
  //   try {
  //     // Ensure title and description are not undefined or empty
  //     if (!title || !description) {
  //       throw new Error('Title and description are required');
  //     }
  
  //     const url = `${host}/api/notes/addnotes`;
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': window.localStorage.getItem('token')
  //       },
  //       body: JSON.stringify({ title, description })
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to add note');
  //     }
  
  //     const note = await response.json();
  
  //     toast.success('Note has been added', { theme: 'colored', autoClose: 2000 });
  //     getAllnotes(); // Refresh notes after successful addition
  //   } catch (error) {
  //     console.error('Error adding note:', error);
  //     toast.error('Failed to add note. Please try again later.', { theme: 'colored' });
  //   }
  // };



const AddNotefun = async (title, description, getAllnotes) => {
  try {
    // Ensure title and description are not undefined or empty
    if (!title || !description) {
      throw new Error('Title and description are required');
    }

    const url = 'https://cloudnotes-1.onrender.com/api/notes/addnotes'; // Replace with your actual backend URL
    const token = window.localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      throw new Error('Failed to add note');
    }

    const note = await response.json();

    toast.success('Note has been added', { theme: 'colored', autoClose: 2000 });
    getAllnotes(); // Refresh notes after successful addition
  } catch (error) {
    // console.error('Error adding note:', error);
   // toast.error('Failed to add note. Please try again later.', { theme: 'colored' });
  }
};

// export default AddNotefun;

// import { toast } from 'react-toastify'; // Ensure you import toast if you haven't already

// import { toast } from 'react-toastify'; // Ensure you import toast if you haven't already

// import { toast } from 'react-toastify'; // Ensure you import toast if you haven't already




  
  


  // Delete a note
  const deleteNotefun = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('token')
      },
      // body: JSON.stringify({ title, description, tag })
    });
    const json = response.json(); 
    //const newNotes = notes.filter((note) => { return note._id !== id })
    //setNotes(newNotes)
    

    // toast.success('Note has been deleted',{
    //   theme:'colored',
    //   autoClose:2000
    // })

    // for user site or frontend
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote);
  }

  

  


  // Edit a note   
  const editNotefun = async (id, title, description) => {
    let url = `${host}/api/notes/updateNotes/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))
    // for user site or frontend
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        break;
      }
    }
    toast.success('Note has updated successfully',{theme:'colored','autoClose':2000});
    setnotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, AddNotefun, deleteNotefun, getAllnotes, editNotefun }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

// import React, { useState, useEffect } from 'react';
// import NoteContext from './NoteContext';
// import { toast } from 'react-toastify';

// const host = 'http://localhost:3001';

// const NoteState = (props) => {
//   const [notes, setNotes] = useState([]);

//   // Fetch all notes by user ID
//   const getAllNotes = async () => {
//     try {
//       if (window.localStorage.getItem('token')) {
//         const url = `${host}/api/notes/fetchallnotes`;
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'auth-token': window.localStorage.getItem('token')
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch notes');
//         }
//         const json = await response.json();
//         json.notes.reverse();
//         setNotes(json.notes);
//       } else {
//         setNotes([]);
//       }
//     } catch (error) {
//       console.error('Error while fetching notes:', error);
//     }
//   };

//   // Add a note
//   const addNote = async (title, description) => {
//     try {
//       const url = `${host}/api/notes/addnotes`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': window.localStorage.getItem('token')
//         },
//         body: JSON.stringify({ title, description })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add note');
//       }
//       const note = await response.json();
//       toast.success('Note has been added', { theme: 'colored', autoClose: 2000 });
//       getAllNotes(); // Refresh notes after adding a new one
//     } catch (error) {
//       console.error('Error while adding note:', error);
//       toast.error('Failed to add note. Please try again later.', { theme: 'colored' });
//     }
//   };

//   // Delete a note
//   const deleteNote = async (id) => {
//     try {
//       const url = `${host}/api/notes/deletenote/${id}`;
//       const response = await fetch(url, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': window.localStorage.getItem('token')
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete note');
//       }
//       toast.success('Note has been deleted', { theme: 'colored', autoClose: 2000 });
//       const newNotes = notes.filter((note) => note._id !== id);
//       setNotes(newNotes);
//     } catch (error) {
//       console.error('Error while deleting note:', error);
//       toast.error('Failed to delete note. Please try again later.', { theme: 'colored' });
//     }
//   };

//   // Edit a note
//   const editNote = async (id, title, description) => {
//     try {
//       const url = `${host}/api/notes/updateNotes/${id}`;
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': window.localStorage.getItem('token')
//         },
//         body: JSON.stringify({ title, description })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update note');
//       }
//       toast.success('Note has been updated successfully', { theme: 'colored', autoClose: 2000 });
//       const updatedNotes = notes.map((note) => (note._id === id ? { ...note, title, description } : note));
//       setNotes(updatedNotes);
//     } catch (error) {
//       console.error('Error while updating note:', error);
//       toast.error('Failed to update note. Please try again later.', { theme: 'colored' });
//     }
//   };

//   useEffect(() => {
//     getAllNotes(); // Fetch notes when component mounts
//   }, []);

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;


