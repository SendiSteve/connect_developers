const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

// load user model
const User = require('../../models/User');

const keys = require('../../config/keys');
const passport = require('../../config/passport');

/* 
    @route GET/api/users/register
    @desc: Register user to the api
    @access: public
*/
router.post('/register', (req, res) => {
    // check if user exists using email as a unique key
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "email already exists"
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });

            // create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                avatar,
                password: req.body.password
            })
            // hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // set new user password to the hash
                    newUser.password = hash;
                    // save the user to the db
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })
});

/* 
    @route  POST/api/users/login
    @desc: Login user 
    @access: public
*/

router.post('/login', (req, res) => {
    // get user email and password
    const email = req.body.email;
    const password = req.body.password;

    // validate user 
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: "User not found"
                });
            }
            // if user exists- match the password with the hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // create jwt payload
                        const payload = {
                            id: user.id,
                            username: user.username,
                            avatar: user.avatar
                        }
                        // sign in token
                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        res.status(400).json({
                            password: "Incorrect password"
                        })
                    }
                })
        })
        .catch(err => console.log(err));
});

module.exports = router;