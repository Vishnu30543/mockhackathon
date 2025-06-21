const mongoose = require('mongoose');
const TrainerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
module.exports = mongoose.model('Trainer', TrainerSchema);
