const express = require('express');
const router = express.Router();
const {
  registerTrainer,
  loginTrainer,
  createCourse,
  getTrainerCourses
} = require('../controllers/trainerController');

// 📌 Register a trainer
router.post('/register', registerTrainer);

// 📌 Login as a trainer
router.post('/login', loginTrainer);

// 📌 Create a course (must include 9 sessions)
router.post('/course', createCourse);

// 📌 Get all courses posted by the trainer
router.get('/courses', getTrainerCourses);

module.exports = router;
