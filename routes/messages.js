const express = require('express')
const Discussion = require('../models/Discussion')
const Forum = require('../models/Forum')
const Message = require('../models/Message')
const { route } = require('./user')
const router = express.Router()


// get all forums
// http://localhost:5000/messages/forums
router.get('/forums', (req, res) => {
    console.log('forums hit')
    Forum.find({}, (err, forums) => {
        if (err) {
            res.send({ success: false, error: err })
        } else {
            res.send({ success: true, forums: forums })
        }
    })
})

// create new forum
// http://localhost:5000/messages/forum/add
// body: topic 
router.post('/forum/add', (req, res) => {
    let { topic } = req.body
    let forum = new Forum({
        topic: topic,
        discussions: [],
    })

    console.log('r', req, topic)
    forum.save(err => {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            res.send({ success: true, msg: "Forum successfully added." })
        }
    })
})

// get all discussions with a certain forumId
// http://localhost:5000/messages/discussions
// query params: forumId
router.get('/discussions', (req, res) => {
    const { forumId } = req.query
    console.log(forumId)
    Discussion.find({}, (err, discussions) => {
        console.log(discussions)
    })
    Discussion.find({ forumId: forumId }, (err, discussions) => {
        if (err) {
            res.send({ success: false, error: err })
        } else {
            console.log(discussions)
            res.send({ success: true, discussions: discussions })
        }
    })
})


// create new discussion and add it to forum
// http://localhost:5000/messages/discussion/add
// body: forumId
router.post('/discussion/add', (req, res) => {
    let { forumId, question } = req.body
    let discussion = new Discussion({
        question: question,
        messages: [],
        forumId: forumId
    })

    discussion.save(err => {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            try {
                // find the forum with forumId & add discussion to it
                Forum.update(
                    { _id: forumId },
                    { $push: { discussions: discussion } }
                    , (err, success) => {
                        if (err) {
                            res.send({ success: false, error: err })
                        } else {
                            res.send({
                                success: true,
                                msg: "Discussion successfully added."
                            })
                        }
                    })

            } catch {
                err => res.send({ success: false, msg: err })
            }
        }
    })
})

// get all messages in a discussion
// http://localhost:5000/messages/messages
// query params: discussionId
router.get('/messages', (req, res) => {
    const { discussionId } = req.query
    Discussion.find({ discussionId: discussionId })
        .populate('messages')
        .exec((err, messages) => {
            if (err) {
                res.send({ success: false, error: err })
            } else {
                console.log(res)
                res.send({ success: true, messages: messages })
            }
        })
})

// create and post message
// http://localhost:5000/messages/message
// body: forumId, firstName, lastName
router.post('/message', (req, res) => {
    const { discussionId, firstName, lastName, text } = req.body
    let message = new Message({
        discussionId,
        firstName,
        lastName,
        text
    })
    message.save(err => {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            Discussion.update(
                { _id: discussionId },
                { $push: { messages: message } },
                (err, success) => {
                    if (err) {
                        res.send({ success: false, error: err })
                    } else {
                        res.send({ success: true, msg: "Message successfully posted" })
                    }
                }
            )
        }
    })
})

module.exports = router