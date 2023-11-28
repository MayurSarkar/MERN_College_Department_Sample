// routes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Other/Attendance'); // Assuming you have a model for Attendance

// Define your route for getting attendance
router.get('/getattendances', async (req, res) => {
  try {
    const { branch, semester, subject } = req.query;
    console.log(branch)
    console.log(semester)
    console.log(subject)
    // Construct the query to find attendance based on branch, semester, and subject
    const query = {
      branch: branch,
      semester: semester,
      subject: subject,
    };
    console.log(query)
    // Use Mongoose to find attendance records based on the query
    const result = await Attendance.find(query);
    console.log(result)
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
