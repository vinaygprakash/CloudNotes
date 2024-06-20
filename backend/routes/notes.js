const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewere/fetchuser');
const { body, validationResult } = require('express-validator');

const Notes = require('../models/Notes'); // importing notes schema 

// Router 1 
// get all the notes of user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
     
        const notes = await Notes.find({ user: req.body.userUniqueKey });
        res.status(200).json({success:true,notes:notes});
    } catch (error) {
        res.status(400).send('Some internal error hai');
    }
})


// ROUTER 2
// for using express validator
// const { body, validationResult } = require('express-validator');
// const notes = require('../models/Notes');

// router.post('/addnotes', fetchuser,
//     // body('title', 'Enter a valid Title').isLength({ min: 1 }),
//     // body('description', 'Enter a valid description').isLength({ min: 1 }),
//     async (req, res) => {
        
//         try {
//             // Finds the validation errors in this request and wraps them in an object with handy functions
//             const errors = validationResult(req);
//             // console.log('gcgvgc')
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({message:'error aaya hai bhai shaab', errors: errors.array() });
//             }
//             console.log('fdfdfd-> ',req.body);
//             const { title, description } = req.body;
//             const notesToSave = new Notes({
//                 title, description, user: req.userUniqueKey,
//             })
//             const savedNote = await notesToSave.save();
//             res.status(200).json(savedNote);
//         } catch (error) {
//             console.log(req.body);
//             console.error(error.message);
//             res.status(500).send('Some error occurrrrrrrrrrrr');
            
//         }
//     }
// )



// POST: Add a new note
router.post('/addnotes', fetchuser,
  body('title', 'Title is required').trim().isLength({ min: 1 }),
  body('description', 'Description is required').trim().isLength({ min: 1 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     
      const { title, description } = req.body;
      //console.log('mjbjc hai -> ',req.body)
      const notesToSave = new Notes({
        title,
        description,
        // user: req.user.userUniqueKey // Assuming `req.user.id` contains the user's ID after `fetchuser` middleware
        user: req.body.userUniqueKey
      });
      //console.log('checkk hai -> ',req.body)

      const savedNote = await notesToSave.save();
    //  console.log('savenote hai -> ',req.body)
      res.status(200).json(savedNote);
    //  console.log('savenote bad hai -> ',req.body)

    } catch (error) {
     console.error('Error adding note:', error.message);
   //  console.log(error.message)
      res.status(500).send('Some error occurred');
    }
  }
);

module.exports = router;



// Router 3 
router.put('/updateNotes/:id', fetchuser, async (req, res) => {
    try {
        
        const { title, description } = req.body;

        // creating a new object of nete
        const newnotes = {};

        if(title) {newnotes.title = title}
        if(description) {newnotes.description = description}
        
        // find the particular note to be update
        let noteToUpdate = await Notes.findById(req.params.id);
        const idd = noteToUpdate._id;
        
        if(!noteToUpdate)
        return res.status(404).send("Sorry Not found");

        if(noteToUpdate.user.toString()!= req.body.userUniqueKey)
        return res.status(401).send("Not allowed");
        
        noteToUpdate = await Notes.findByIdAndUpdate(idd,{$set:newnotes},{new:true});

        res.status(200).json(noteToUpdate);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Some error occur');
    }
})



//Router 4 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {                               
        // find the particular note to be update
        let noteToDelete = await Notes.findById(req.params.id);
        const idd = noteToDelete._id;
      //  console.log('asasassasasasasas->',noteToDelete)
        if(!noteToDelete)
        return res.status(404).send("Sorry Note not found");

        if(noteToDelete.user.toString()!= req.body.userUniqueKey)
        return res.status(401).send("Not allowed");
        
        // noteToDelete = await Notes.findByIdAndDelete(req.params.id);
        
        noteToDelete = await Notes.findByIdAndDelete(idd);

        res.status(200).json({"Success":"Note has been deleted",note:idd});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Some error occur');
    }
})

module.exports = router;

