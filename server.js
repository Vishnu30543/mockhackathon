// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
connectDB();
app.use(express.json());
app.use('/trainer', require('./routes/trainer'));
app.use('/learner', require('./routes/learner'));
app.listen(5000, () => console.log("Server running on port 5000"));
