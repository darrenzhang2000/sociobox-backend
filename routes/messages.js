const express = require('express')
const Forum = require('../models/Forum')
const router = express.Router()

router.get('/forum/add', (req, res) => {
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



module.exports = router