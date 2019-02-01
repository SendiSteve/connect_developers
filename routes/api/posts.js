const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load post model
const Post = require('../../models/Post');

// @route POST api/posts
// @desc Creates post
// @access Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Create post
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    });
    // Save
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
});
module.exports = router;