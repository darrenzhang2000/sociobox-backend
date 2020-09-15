var mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    Topic: String,
    discussions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Discussion'
    }],
})

module.exports = mongoose.model('Forum', forumSchema)