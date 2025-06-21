const Learner = require('../models/Learner');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 Register Learner
exports.registerLearner = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Learner.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Learner already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const learner = new Learner({ name, email, password: hashedPassword });

    await learner.save();
    res.status(201).json({ message: 'Learner registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Login Learner
exports.loginLearner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const learner = await Learner.findOne({ email });
    if (!learner) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, learner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, learnerId: learner._id, name: learner.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get All Courses (Public)
exports.getCourses = async (req, res) => {
  try {
    console.log("Fetching learner all courses");
    const courses = await Course.find().populate('trainer', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Submit Feedback (Protected)
exports.giveFeedback = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { comment, rating } = req.body;
    const learnerId = req.user.id; // From JWT middleware

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.feedbacks.push({ learner: learnerId, comment, rating });
    await course.save();

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
