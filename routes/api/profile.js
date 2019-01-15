const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// load profile model
const Profile = require('../../models/Profile');

// Load user model
const User = require('../../models/User');

/*
    @route GET api/profile
    @desc Get current user profile
    @access Private
*/

router.get('/', passport.authenticate('jwt', {
    'session': false
}), (req, res) => {
    const errors = {};
    // find user
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

/*
    @route POST api/profile
    @ desc create user profile
    @access private
*/
router.post('/profile', passport.authenticate('jwt', {
    session: false
}, (req, res) => {
    // Get user input
    profileFields = {}
    profileFields.user = req.body.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.status = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // skills split into an array
    if (typeof req.body.skills !== undefined) {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // find logged in current user
    Profile.findOne({
            user: req.body.id
        })
        .then(profile => {
            if (profile) {
                // update
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile))
            } else {
                // create new profile
                // check if handle exists
                Profile.findOne({
                        handle: req.body.handle
                    })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors)
                        }
                        // save profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => {
                                res.json(profile)
                            })
                            .catch(err => res.json(err))

                    })
            }
        })

}))

module.exports = router;