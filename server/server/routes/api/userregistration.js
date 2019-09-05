const User = require('../../models/UserRegistration');
const Events = require('../../models/Events');

module.exports = (app) => {

    //Get Event By ID
    app.get('/api/userregistration/getevents:id', (req, res, next) => {
        Events.findById(req.params.id)
        .exec()
        .then((events) => res.json(events))
        .catch((err) => next(err));

    });
    //Updated Event by ID
    app.put('/api/udateavailableseat/:id', (req, res, next) => {
      const { body } = req;
      let {
        availableseatres,
      } = body; 
      Events.findById(req.params.id)
        .exec()
        .then((events) => {
          events.availableseat = availableseatres;
          events.save((err, events) => {
              if (err) {
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }
              return res.send({
                success: true,
                message: 'Events Modified'
              });
            });
        })
        .catch((err) => next(err));
    });
    //Save Users
    app.post('/api/userregistration/users', (req, res, next) => {
        const { body } = req;
        let { name, email,number, eventid } = body; 

        email = email.toLowerCase().trim();  
      
        User.find({
            email: email
        }, (err, previousUsers) => {
        if (err) {
            return res.send({
            success: false,
            message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
            success: false,
            message: 'Error: You have already registered on this events'
            });
        }
        // Save the new user
        const newUser = new User();
        newUser.name = name; 
        newUser.email = email;
        newUser.number = number;
        newUser.eventid = eventid;
        newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Thank For Registration'
        });
      });
    });
  }); 
};