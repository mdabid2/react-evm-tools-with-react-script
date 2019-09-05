const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userListSchema= new Schema({
        name: { type: String, default: "" },
        email: { type: String, default: ""},
        number: { type: String, default: ""},
        eventid: { type: String, default: ""},
        createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UsersList', userListSchema);
