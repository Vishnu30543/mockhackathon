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

const verifyToken = require('../auth');

router.post('/course', verifyToken, createCourse);
router.get('/courses', verifyToken, getTrainerCourses);


module.exports = router;
