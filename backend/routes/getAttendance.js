// routes/attendance.js

const express = require("express");
const router = express.Router();
const Attendance = require("../models/Other/Attendance");

router.get("/getAttendanceAllSubjects", async (req, res) => {
  try {
    const { branch, semester, enrollmentNo } = req.query;
    const query = {
      "attendance.enrollmentNo": enrollmentNo,
      branch: branch,
      semester: semester,
    };
    console.log(query)

    const result = await Attendance.find(query);
    console.log(result)

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;