const User = require('../../models/UserRegistration');
const Events = require('../../models/Events');

module.exports = (app) => {

    //Get Event By Text String
    app.post('/api/searchresults', (req, res, next) => {
        Events.find( { $text: { $search:req.query.searchtext } } )
        .then((events) => res.json(events))
        .catch((err) => next(err));
    });

    //Get USERS By ID
    app.get('/api/searchresults/:id', (req, res, next) => {
        const eventids=(req.params.id).split(',');
        User.find({ eventid: { $in: eventids } })
        .exec()
        .then((events) => res.json(events))
        .catch((err) => next(err));

    });
};