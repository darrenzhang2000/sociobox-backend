const express = require('express')
const Discussion = require('../models/Discussion')
const Forum = require('../models/Forum')
const router = express.Router()

router.post('/forum/add', (req, res) => {
    let { topic } = req.params
    let forum = new Forum({
        topic: topic,
        discussions: [],
    })

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

router.post('/forum/:id/discussion/add', (req, res) => {
    let { question } = req.params
    let discussion = new Discussion({
        question: question,
        messages: []
    })

    discussion.save(err => {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            res.send({ success: true, msg: "Discussion successfully added."})
        }
    })
})


module.exports = router