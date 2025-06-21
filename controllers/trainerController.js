const Trainer = require('../models/Trainer');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 Register Trainer
exports.registerTrainer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if trainer already exists
    const existing = await Trainer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Trainer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const trainer = new Trainer({ name, email, password: hashedPassword });
    await trainer.save();

    res.status(201).json({ message: 'Trainer registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Login Trainer
exports.loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trainer = await Trainer.findOne({ email });
    if (!trainer) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: trainer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, trainerId: trainer._id, name: trainer.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, sessions, trainerId } = req.body;

    if (!sessions || sessions.length !== 9) {
      return res.status(400).json({ message: 'Exactly 9 sessions are required' });
    }

    const course = new Course({
      title,
      description,
      sessions,
      trainer: trainerId
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get All Courses by Trainer
exports.getTrainerCourses = async (req, res) => {
  try {
    const { trainerId } = req.query;

    const courses = await Course.find({ trainer: trainerId });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
