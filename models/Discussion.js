var mongoose = require('mongoose')

const discussionSchema = new mongoose.Schema({
    question: String,
    timestamp: { type: Date, default: Date.now() },
    messages: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message' 
    }],
    forumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum'
    }
})

module.exports = mongoose.model('Discussion', discussionSchema)