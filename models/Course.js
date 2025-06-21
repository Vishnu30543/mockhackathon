const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,

  // 9 sessions: each with title and YouTube video URL
  sessions: [
    {
      title: String,
      videoUrl: String
    }
  ],

  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },

  feedbacks: [
    {
      learner: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' },
      comment: String,
      rating: Number
    }
  ]
});

module.exports = mongoose.model('Course', CourseSchema);
