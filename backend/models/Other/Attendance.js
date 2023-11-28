const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  branch: String,
  semester: String,
  subject: String,
  totalClasses: { type: Number, default: 1 },
  attendance: [
    {
      enrollmentNo: String,
      isPresent: { type: Number, default: 0 },
    },
  ],
});

AttendanceSchema.methods.updateAttendance = function (enrollmentNo, isPresent) {
  const studentAttendance = this.attendance.find((a) => a.enrollmentNo === enrollmentNo);

  if (studentAttendance) {
    // If attendance for the student exists, update the existing record
    studentAttendance.isPresent = isPresent;
  } else {
    // If attendance for the student doesn't exist, create a new record
    this.attendance.push({ enrollmentNo, isPresent });
  }

  // Update total classes held
  this.totalClasses += 1;

  return this.save();
};

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
