var mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: String,
    firstName: String,
    lastName: String,
})

module.exports = mongoose.model('Message', messageSchema)