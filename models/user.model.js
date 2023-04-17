const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['User', 'Moderator'],
      default: 'User',
    },
  });

 const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };