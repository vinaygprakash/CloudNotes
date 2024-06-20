const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({    
    user:{  //for store the id of the user it is diffrent from id of notes it is original id crossponding to user regestration
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,        
    },    
    tag:{
        type: String,
        default: "General",
    },    
    date:{
        type: Date,
        default: Date.now,
    }
});

// now we need to create a Collection here: student is Collection name 
const notes = new mongoose.model("notes", NotesSchema);

module.exports = notes;