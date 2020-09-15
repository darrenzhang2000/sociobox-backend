const express = require('express')
const Discussion = require('../models/Discussion')
const Forum = require('../models/Forum')
const router = express.Router()

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

// create new discussion
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


module.exports = router