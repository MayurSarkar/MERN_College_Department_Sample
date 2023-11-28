const express = require("express");
const router = express.Router();
const Attendance = require("../models/Other/Attendance");

const submitAttendance = async (req, res) => {
  try {
    const { branch, semester, subject, attendance } = req.body;

    // You might want to add validation and error handling here

    // Check if attendance for the given branch, semester, and subject already exists
    let existingAttendance = await Attendance.findOne({
      branch,
      semester,
      subject,
    });

    if (!existingAttendance) {
      // If attendance doesn't exist, create a new document
      existingAttendance = new Attendance({
        branch,
        semester,
        subject,
        totalClasses: 0, // Initialize totalClasses to 1 if it's a new attendance record
        attendance: [],
      });
    } else {
      // If attendance exists, update the attendance array and totalClasses
      existingAttendance.totalClasses += 1;

      // Update individual attendance count for each student
      attendance.forEach((student) => {
        const existingStudent = existingAttendance.attendance.find(
          (s) => s.enrollmentNo === student.enrollmentNo
        );

        if (existingStudent) {
          existingStudent.isPresent += student.isPresent ? 1 : 0;
        } else {
          existingAttendance.attendance.push({
            enrollmentNo: student.enrollmentNo,
            isPresent: student.isPresent ? 1 : 0,
          });
        }
      });
    }

    // Save the attendance data to the database
    await existingAttendance.save();

    return res.status(200).json({
      success: true,
      message: 'Attendance submitted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { submitAttendance };
