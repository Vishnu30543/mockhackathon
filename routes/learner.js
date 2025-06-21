const express = require('express');
const router = express.Router();
const {
  registerLearner,
  loginLearner,
  getCourses,
  giveFeedback,
  createDiscussion,
  replyToDiscussion,
  getCourseDiscussions
} = require('../controllers/learnerController');

// 📌 Learner registration
router.post('/register', registerLearner);

// 📌 Learner login
router.post('/login', loginLearner);

// 📌 Get all available courses
router.get('/courses', getCourses);

// 📌 Give feedback to a course
const verifyToken = require('../auth');

router.post('/feedback/:courseId', verifyToken, giveFeedback);

// // 🆕 Discussion routes
// router.post('/discussion/:courseId', verifyToken, createDiscussion); // Create discussion
// router.post('/discussion/:courseId/:discussionId/reply', verifyToken, replyToDiscussion); // Reply to discussion
// router.get('/discussions/:courseId', getCourseDiscussions); // View all discussions in a course
  


module.exports = router;
