const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventListSchema= new Schema({
        eventname: {
            type: String, default: "", text: true
        },
        venue: {
            type: String, default: ""
        },
        eventdetails: {
            type: String, default: ""
        },
        eventdate: {
            type: String, default: ""
        },
        totalseat: {
            type: Number, default: 20
        },
        availableseat: {
            type: Number, default: 20
        },
        publishevnt: {
            type: Boolean, default: false
        },
        createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventList', eventListSchema);
