import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    // Fetch all students when the component mounts
    fetchAllStudents();
  }, [branchFilter, semesterFilter]);

  const fetchAllStudents = () => {
    toast.loading("Getting Students");
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    };
    const filters = {
      branch: branchFilter,
      semester: semesterFilter,
    };
    axios
      .post(`${baseApiURL()}/student/details/getDetails`, filters, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setStudents(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const searchStudentHandler = (e) => {
    e.preventDefault();
    // Implement search logic here
    // You can filter the students based on the search criteria
  };
  

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
      </div>
      <div className="my-6 mx-auto w-full">
        {/* <form
          className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
          onSubmit={searchStudentHandler}
        >
          <input
            type="text"
            className="px-6 py-3 w-full outline-none"
            placeholder="Enrollment No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 text-2xl hover:text-blue-500" type="submit">
            <FiSearch />
          </button>
        </form> */}
        <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
          <div className="w-full">
            <label className="leading-7 text-base">
              Branch:
            </label>
            <select
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="">All</option>
              {/* Add your branch options here */}
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="CIVIL">CIVIL</option>
              {/* Add more branches as needed */}
            </select>
          </div>
          <div className="w-full">
            <label className="leading-7 text-base">
              Semester:
            </label>
            <select
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="">All</option>
              {/* Add your semester options here */}
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              {/* Add more semesters as needed */}
            </select>
          </div>
        </div>
        {students.map((student) => (
          <div
            key={student.enrollmentNo}
            className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md"
          >
            <div className="profile__content">
            <img
                src={student.profile}
                alt="student profile"
                className="h-[200px] w-[200px] hidden object-cover rounded-lg shadow-md image__mobile"
              />
              <p className="text-2xl font-semibold">
                {student.firstName} {student.middleName} {student.lastName}
              </p>
              <div className="mt-3">
                <p className="text-lg font-normal mb-2 break-words">
                  Enrollment No: {student.enrollmentNo}
                </p>
                <p className="text-lg font-normal mb-2 break-words">
                  Phone Number: +91 {student.phoneNumber}
                </p>
                <p className="text-lg font-normal mb-2 break-words">
                  Email Address: {student.email}
                </p>
                <p className="text-lg font-normal mb-2 break-words">
                  Branch: {student.branch}
                </p>
                <p className="text-lg font-normal mb-2 break-words">
                  Semester: {student.semester}
                </p>
              </div>
            </div>
            <img
              src={student.profile}
              alt="student profile"
              className="h-[200px] w-[200px] object-cover rounded-lg shadow-md image__desktop"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
