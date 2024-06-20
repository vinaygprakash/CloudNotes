
const mongoose = require('mongoose');
const mongoURL = process.env.URL;

mongoose.connect(mongoURL, {
    // useNewUrlParserç: true,
    // useUnifiedTopology: true,    
}).then(() => {
    console.log(`connection succesfull`);
}).catch((err) => {
    console.log(`No connection ${err}`);
});