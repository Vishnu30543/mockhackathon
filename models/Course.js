const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  sessions: [String], // 9 session titles/descriptions
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  feedbacks: [{
    learner: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' },
    comment: String,
    rating: Number
  }]
});
module.exports = mongoose.model('Course', CourseSchema);
