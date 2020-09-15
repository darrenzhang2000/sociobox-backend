var mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: String,
    firstName: String,
    lastName: String,
    timestamp: {
        type: Date,
        default: Date.now()
    },
    discussionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion'
    }
})

module.exports = mongoose.model('Message', messageSchema)