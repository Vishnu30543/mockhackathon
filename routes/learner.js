const express = require('express');
const router = express.Router();
const {
  registerLearner,
  loginLearner,
  getCourses,
  giveFeedback
} = require('../controllers/learnerController');

// 📌 Learner registration
router.post('/register', registerLearner);

// 📌 Learner login
router.post('/login', loginLearner);

// 📌 Get all available courses
router.get('/courses', getCourses);

// 📌 Give feedback to a course
router.post('/feedback/:courseId', giveFeedback);

module.exports = router;
