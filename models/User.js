const mongoose = require ('mongoose');
const { boolean } = require('webidl-conversions');

const userSchema = new mongoose.Schema({
  name: String,
  email : String,
  password : String,
  rights: Boolean,
});
const User = mongoose.model('User', userSchema);

module.exports = User