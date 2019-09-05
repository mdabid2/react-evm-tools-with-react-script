const Events = require('../../models/Events');

module.exports = (app) => {
    //Get All Events
    app.get('/api/addevent', (req, res, next) => {
        Events.find()
            .exec()
            .then((events) => res.json(events))
            .catch((err) => next(err));
    });
    app.get('/api/editevent/:id', (req, res, next) => {
        Events.findById(req.params.id)
        .exec()
        .then((events) => res.json(events))
        .catch((err) => next(err));

    });
    //Save Event by ID
    app.put('/api/editevent/:id', (req, res, next) => {
        const { body } = req;
        let {
            venue,
            eventdetails,
        } = body;  
        Events.findById(req.params.id)
          .exec()
          .then((events) => {
            events.venue = venue;
            events.eventdetails = eventdetails;
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
    //Delete Event by ID
    app.delete('/api/addevent/:id', function (req, res, next) {
        Events.findOneAndRemove({ _id: req.params.id })
          .exec()
          .then((events) => res.json())
          .catch((err) => next(err));
    });
    //Publish Event by ID
    app.put('/api/publishevent/:id', function (req, res, next) {
      const { body } = req;
      let {
        publishevnt,
      } = body;  
      Events.findById(req.params.id)
        .exec()
        .then((events) => {
          events.publishevnt = publishevnt;
          events.save((err, events) => {
              if (err) {
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }
              return res.send({
                success: true,
              });
            });
        })
        .catch((err) => next(err));
    });
    //Save New Events
    app.post('/api/addevent', (req, res, next) => {
        const { body } = req;
        let {
            eventname,
            venue,
            eventdetails,
            eventdate,
            totalseat,
        } = body;  
        
     // Save the new events
     const newEvent = new Events();
     newEvent.eventname = eventname;
     newEvent.venue = venue;
     newEvent.eventdetails = eventdetails;
     newEvent.eventdate = eventdate;
     newEvent.totalseat = totalseat;
     newEvent.availableseat = totalseat;
     newEvent.save((err, events) => {
       if (err) {
         return res.send({
           success: false,
           message: 'Error: Server error'
         });
       }
       return res.send({
         success: true,
         message: 'New Events Added'
       });
     });
  }); 
};