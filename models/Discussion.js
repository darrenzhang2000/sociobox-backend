var mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
    question: String,
    timestamp: Date,
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
})

module.exports = mongoose.model('Discussion', discussionSchema)