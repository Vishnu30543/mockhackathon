const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String, // New field
  location: {
    state: String,
    city: String
  }
});

module.exports = mongoose.model('Learner', LearnerSchema);
