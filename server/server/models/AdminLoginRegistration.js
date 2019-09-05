const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  apporved:{
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
});
RegisterSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
RegisterSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('RegisterUser', RegisterSchema);