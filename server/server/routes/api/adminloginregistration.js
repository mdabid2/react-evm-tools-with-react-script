const User = require('../../models/AdminLoginRegistration');
module.exports = (app) => {
  app.post('/api/register', (req, res, next) => {
    const { body } = req;
    let {
      name,
      username,
      email,
      password,
      superadmin
    } = body; 

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
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.name = name;
      newUser.username = username;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.apporved = (superadmin=='$ofoBGQn2fV48Tyx4L')?true:false;
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'User Register'
        });
      });
    });
  }); 
  //Loing
  app.post('/api/login', (req, res, next) => {
    const { body } = req;
    let {
      email,
      password
    } = body; 
    email = email.toLowerCase().trim();  
    User.findOne({ email: email}, (err, matchEmail) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (matchEmail) {
        if(!matchEmail.validPassword(password)){
          return res.send({
            success: false,
            message: 'Password do not match'  
          });
        }else if(!matchEmail.apporved) {
          return res.send({
            success: false,
            message: 'Sorry! User Not Apporved For Loggin'  
          });
        } else {
          return res.send({
            success: true,
            message: 'login success'  
          });
        }
        
      } else {
        return res.send({
          success: false,
          message: 'Username do not match'
        });
      }
    });
  }); 
};