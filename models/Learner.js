const mongoose = require('mongoose');
const LearnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
module.exports = mongoose.model('Learner', LearnerSchema);
