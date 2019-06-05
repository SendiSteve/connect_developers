const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


// load routes
const users = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);
// config db
const db = require('./config/keys').mongoURI;

// connect to db
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('connection successful'))
    .catch(err => console.log(err))

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})