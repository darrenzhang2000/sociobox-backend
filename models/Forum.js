var mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    Topic: String,
    Discussions: [{type: mongoose.Schema.ObjectId, ref: 'Discussion'}],
})

module.exports = mongoose.model('Forum', forumSchema)