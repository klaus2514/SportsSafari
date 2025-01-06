const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving


module.exports = mongoose.model('User', userSchema);
