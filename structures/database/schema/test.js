const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    clientId: String,
    guildId: String,
})

module.exports = mongoose.model('test', schema);