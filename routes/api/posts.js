const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load post model
const Post = require('../../models/Post');
// load user profile
const Profile = require('../../models/Profile');

// load validations
const validatePostInput = require('../../validation/post');

// @route POST api/posts
// @desc Creates post
// @access Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // check validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

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
        .catch(err => res.status(400).json(err));
});

// @route GET api/posts
// @desc Get post
// @access Public

router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(post => {
            if (post) {
                res.json(post);
            }
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post);
            }
            res.status(404).json({
                'postnotfound': 'Post not found'
            });
        })
        .catch(err => res.status(404).json({
            'no post found': 'No post found'
        }));
});

// @route DELETE api/posts/:id
// @desc delete post by id
// @access Private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // check for post owner
                    if (post.user.toString() != req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'User not authorized'
                        })
                    }
                    // Delete
                    post.remove()
                        .then(() => res.json({
                            'success': true
                        }))
                })
        })
});

// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // check validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    // check if post exists
    Post.findById(req.params.id)
        .then(post => {
            // create new comment
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            // Add comment to comments array
            post.comments.unshift(newComment);
            // Save
            post.save()
                .then(post => res.json(post))
                .catch(err => res.status(401).json(err));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'Post not found'
        }));
});

// @route POST api/posts/comment/:id/:comment_id
// @desc Delete comment from post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // check to see if post exists
            if (post) {
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({
                        commentdoesnotexist: 'comment does not exist'
                    })
                }
                // Get remove index
                const removeIndex = post.comments
                    .map(item => item.toString())
                    .indexOf(req.params.comment_id)

                // Splice it out of aarray
                post.comments.splice(removeIndex, 1)

                // save
                post.save()
                    .then(post => res.json(post))
                    .catch(err => res.status(401).json(err))

            }
        })
        .catch(err => res.status(404).json({
            postnotfound: 'Post not found'
        }));
})
module.exports = router;