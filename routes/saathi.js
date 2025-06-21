const express = require('express');
const router = express.Router();
const verifyToken = require('../auth');

const {
  registerSaathi,
  loginSaathi,
  getCourses,
  giveFeedback,
  createDiscussion,
  replyToDiscussion,
  getCourseDiscussions
} = require('../controllers/saathiController');

// 📌 Saathi registration
router.post('/register', registerSaathi);

// 📌 Saathi login
router.post('/login', loginSaathi);

// 📌 Get all available courses
router.get('/courses', getCourses);

// 📌 Give feedback to a course
router.post('/feedback/:courseId', verifyToken, giveFeedback);

// 📌 Create a discussion under a session
router.post('/discussion/:courseId', verifyToken, createDiscussion);

// 📌 Reply to a discussion
router.post('/discussion/:courseId/:discussionId/reply', verifyToken, replyToDiscussion);

// 📌 Get all discussions for a course
router.get('/discussions/:courseId', getCourseDiscussions);

module.exports = router;
