const mongoose = require('mongoose');

const SaathiSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String, // Mobile number of Saathi
  location: {
    state: String,
    city: String
  }
});

module.exports = mongoose.model('Saathi', SaathiSchema);
