// ViewAttendance.js
import React, { useState } from 'react';
import axios from 'axios';
import { baseApiURL } from '../../baseUrl';
import toast from 'react-hot-toast';
import Heading from '../../components/Heading';

const ViewAttendance = ({ selected }) => {
    const [attendanceData, setAttendanceData] = useState([]);

    const getAttendanceHandler = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };

        axios
            .get(`${baseApiURL()}/attendance/getattendances`, {
                params: { branch: selected.branch, semester: selected.semester, subject: selected.subject },
                headers,
            })
            .then((response) => {
                console.log(response.data.data)
                if (response.data.success && response.data.data.length > 0) {
                    setAttendanceData(response.data.data);
                    console.log(attendanceData.totalClasses)
                } else {
                    toast.error('No attendance data found for the specified criteria.');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(`Failed to fetch attendance details. ${error.message}`);
            });
    };

    return (
        <>
        
        <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
        <div className="relative flex justify-between items-center w-full">
                <Heading title={`Attendance List`} />
            </div>
            <button
                className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
                onClick={getAttendanceHandler}
            >
                View Attendance
            </button>

            {attendanceData.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Attendance Details</h2>
                    {attendanceData.map((entry) => (
                        <div><strong>Total Classes Held:</strong> {entry.totalClasses}</div>
                    ))}
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="py-2">Enrollment No</th>
                                <th className="py-2 px-4">Present Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((entry) => (
                                <React.Fragment key={entry._id}>
                                    {entry.attendance.map((attendanceEntry) => (
                                        <tr key={attendanceEntry._id}>
                                            <td className="py-2">{attendanceEntry.enrollmentNo}</td>
                                            
                                            <td className="py-2 px-4 flex justify-center">{attendanceEntry.isPresent}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
};

export default ViewAttendance;
