// Attendance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import toast from 'react-hot-toast';
import Heading from '../../components/Heading';
import { baseApiURL } from '../../baseUrl';
import ViewAttendance from './ViewAttendance';

const Attendance = () => {
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    branch: '',
    semester: '',
    subject: '',
  });

  const loadStudentDetails = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { branch: selected.branch, semester: selected.semester },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitAttendanceHandler = () => {
   
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
    
      // Extracting relevant attendance data for submission
      const attendanceData = studentData.map((student) => ({
        enrollmentNo: student.enrollmentNo,
        isPresent: student.isPresent || false,
      }));
    
      // Assuming you have an API endpoint for submitting attendance
      axios
        .post(
          `${baseApiURL()}/attendance/submitAttendance`,
          {
            branch: selected.branch,
            semester: selected.semester,
            subject: selected.subject,
            attendance: attendanceData,
          },
          { headers }
        )
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    
    
    console.log('Attendance data:', studentData);
  };

  const toggleAttendanceHandler = (enrollmentNo) => {
    setStudentData((prevData) => {
      return prevData.map((student) =>
        student.enrollmentNo === enrollmentNo
          ? { ...student, isPresent: !student.isPresent }
          : student
      );
    });
  };

  const getBranchData = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
    toast.loading('Loading Subjects');
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const resetValueHandler = () => {
    setStudentData();
  };

  return (
    <>
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full attendance__header">
        <Heading title={`Mark Attendance`} />
        {studentData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!studentData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6 attendance">
            <div className="w-full">
              <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {branch &&
                  branch.map((branch) => (
                    <option value={branch.name} key={branch.name}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="semester" className="leading-7 text-base ">
                Select Semester
              </label>
              <select
                id="semester"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="leading-7 text-base ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {subject &&
                  subject.map((subject) => (
                    <option value={subject.name} key={subject.name}>
                      {subject.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg">
            Mark Attendance for {selected.branch} Semester {selected.semester} of{' '}
            {selected.subject}
          </p>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="attendanceContainer"
          >
            {studentData.map((student) => (
              <div
                key={student.enrollmentNo}
                className="w-[30%] flex justify-between items-center border-2 border-blue-500 rounded attendance__content"
                id={student.enrollmentNo}
              >
                <p className="text-lg px-4 w-1/2 bg-blue-50">
                  {student.firstName} {student.middleName} {student.lastName}
                </p>
                <button
                  className={`px-6 py-2 focus:ring-0 outline-none w-1/2 ${
                    student.isPresent ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  onClick={() => toggleAttendanceHandler(student.enrollmentNo)}
                >
                  {student.isPresent ? 'Present' : 'Absent'}
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitAttendanceHandler}
          >
            Submit Attendance
          </button>
        </>
      )}
      
    </div>
    <ViewAttendance selected={selected} />
    </>
  );
};

export default Attendance;
