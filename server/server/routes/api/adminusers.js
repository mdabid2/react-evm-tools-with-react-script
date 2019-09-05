const User = require('../../models/AdminLoginRegistration');

module.exports = (app) => {

    //Get All Admin Users
    app.get('/api/adminusers/', (req, res, next) => {
        User.find()
            .exec()
            .then((users) => res.json(users))
            .catch((err) => next(err));
    });

    //Apporved USERS by ID
    app.put('/api/adminusers/:id', function (req, res, next) {
        const { body } = req;
        let {
            apporved,
        } = body;  
        User.findById(req.params.id)
          .exec()
          .then((user) => {
            user.apporved = apporved;
            user.save((err, user) => {
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
};