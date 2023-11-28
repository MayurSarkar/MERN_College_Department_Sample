// AttendanceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseApiURL } from '../../baseUrl';

const AttendanceForm = ({ enrollmentNo }) => {
  const [attendance, setAttendance] = useState(false);

  const markAttendanceHandler = async () => {
    try {
      const response = await axios.post(
        `${baseApiURL()}/markAttendance`, // Update with your actual endpoint
        {
          enrollmentNo,
          attendance,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <label htmlFor={`attendance_${enrollmentNo}`}>
        Mark Attendance:
        <input
          type="checkbox"
          id={`attendance_${enrollmentNo}`}
          checked={attendance}
          onChange={() => setAttendance(!attendance)}
        />
      </label>
      <button
        className="bg-green-500 px-4 py-2 ml-2 rounded text-white"
        onClick={markAttendanceHandler}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;
