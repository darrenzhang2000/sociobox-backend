const express = require('express')
const Discussion = require('../models/Discussion')
const Forum = require('../models/Forum')
const Message = require('../models/Message')
const router = express.Router()

// get all forums
// http://localhost:5000/messages/message
router.get('/forums', (req, res) => {
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

// get all discussions
// http://localhost:5000/messages/discussions
router.get('/discussions', (req, res) => {
    Discussion.find({}, (err, discussions) => {
        if (err) {
            res.send({ success: false, error: err })
        } else {
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