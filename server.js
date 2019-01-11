const express = require('express');
const mongoose = require('mongoose');

const app = express();

// config db
const db = require('./config/keys').mongoURL;
 
// connect to db
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
.catch(err => console.log(err))
    
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})