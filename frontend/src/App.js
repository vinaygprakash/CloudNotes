import './App.css';
import Login from './components/SignInUp/Login';
import Signup from './components/SignInUp/Signup';
import { Routes, Route } from 'react-router';
import NoteState from './context/notes/NoteState';
import Footer from './components/footer/Footer';
import Addnote from './components/Addnotes/Addnote';
import Notes from './components/Notes';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <>
      <NoteState>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/addnotes" element={<Addnote/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </NoteState>
      <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App;
