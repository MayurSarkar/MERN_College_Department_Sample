import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  const [attendance, setAttendance] = useState({
    totalClasses: 0,
    isPresent: 0,
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    };

    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { enrollmentNo: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    };

    axios
      .post(
        `${baseApiURL()}/student/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    };

    axios
      .post(
        `${baseApiURL()}/student/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const getAttendanceAllSubjects = () => {
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    };

    const queryParams = {
      enrollmentNo: router.state.loginid,
      branch: data.branch,
      semester: data.semester,
    };

    axios
      .get(`${baseApiURL()}/attendance/getAttendanceAllSubjects`, {
        headers: headers,
        params: queryParams,
      })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          const userAttendance = response.data.filter((item) =>
            item.attendance.some((a) => a.enrollmentNo === router.state.loginid)
          );
          console.log(userAttendance)

          if (userAttendance.length > 0) {
            const totalClasses = userAttendance.reduce(
              (total, subject) => total + subject.totalClasses,
              0
            );
            console.log(totalClasses)
            const isPresent = userAttendance.reduce(
              (present, subject) =>
                present +
                (subject.attendance.find((a) => a.enrollmentNo === router.state.loginid)?.isPresent || 0),
              0
            );

            setAttendance({
              totalClasses: totalClasses,
              isPresent: isPresent,
            });
          } else {
            toast.error("Attendance details not found for the given enrollment number.");
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch attendance details for all subjects.");
      });
  };

  return (
    <div className="w-[85%] mx-auto my-8 flex justify-between items-start">
      {data && (
        <>
        <div className="profile">
          <img
            src={data.profile}
            alt="student profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md image__mobile"
          />
          <div>
            <p className="text-2xl font-semibold">
              Hello {data.firstName} {data.middleName} {data.lastName}👋
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal mb-2">
                Enrollment No: {data.enrollmentNo}
              </p>
              <p className="text-lg font-normal mb-2">Branch: {data.branch}</p>
              <p className="text-lg font-normal mb-2">
                Semester: {data.semester}
              </p>
              <p className="text-lg font-normal mb-2">
                Phone Number: +91 {data.phoneNumber}
              </p>
              <p className="text-lg font-normal mb-2">
                Email Address: {data.email}
              </p>
            </div>
            <button
              className={`${showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
                }  px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <button
                  className="mt-4 hover:border-b-2 hover:border-blue-500"
                  onClick={checkPasswordHandler}
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
            <div>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded mt-4"
              onClick={getAttendanceAllSubjects}
            >
              Calculate Attendance
            </button>
            </div>
            {/* Display attendance details */}
            <div className="mt-4">
              <p className="text-lg font-normal mb-2">
                Total Classes: {attendance.totalClasses}
              </p>
              <p className="text-lg font-normal mb-2">
                Classes Present: {attendance.isPresent}
              </p>
            </div>
          </div>

          
        </div>
        <img
            src={data.profile}
            alt="student profile"
            className="h-[200px] w-[200px] object-cover rounded-lg shadow-md image__desktop"
          />
        </>
      )}

    </div>
  );
};

export default Profile;
