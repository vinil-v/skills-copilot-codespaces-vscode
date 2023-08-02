// Create web server 

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

// Import models
const Comments = require('../models/comments');

// Define router
const commentRouter = express.Router();

// Use body-parser to parse request body
commentRouter.use(bodyParser.json());

// Define routes
commentRouter.route('/')
    .get((req, res, next) => {
        // Get comments
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        // Create new comment
        if (req.body != null) {
            req.body.author = req.user._id;
            Comments.create(req.body)
                .then((comment) => {
                    Comments.findById(comment._id)
                        .populate('author')
                        .then((comment) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(comment);
                        })
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            err = new Error('Comment not found in request body');
            err.status = 404;
            return next(err);
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        // Update all comments
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        // Delete all comments
        Comments.deleteMany({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

commentRouter.route('/:commentId')
    .get((req, res, next) => {
        // Get comment
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                if (comment != null) {
                    res.statusCode = 200;