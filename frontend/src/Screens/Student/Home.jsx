import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const sethandler = () => {
    setIsOpen(!isOpen);
  };
  const setHomeHandler = (value) => {
    sethandler();
    setSelectedMenu(value);
  };
  

  return (
    <section>
      {load && (
        <>
          <Navbar setIsOpen={sethandler} IsOpen={isOpen} />
          <ul className={
              isOpen
                ? "flex justify-evenly items-center gap-10 w-[85%] mx-auto my-8 student__navbar student__navbar-open"
                : "flex justify-evenly items-center gap-10 w-[85%] mx-auto my-8 student__navbar"
            }>
            <li
              className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "My Profile"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }
              ${isOpen ? "student__navbar-open" : "student__navbar-close"}`}
              onClick={() => setSelectedMenu("My Profile")}
            >
              My Profile
            </li>
            <li
              className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Timetable"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Timetable")}
            >
              Timetable
            </li>
            <li
              className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Marks"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Marks")}
            >
              Marks
            </li>
            <li
              className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Material"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Material")}
            >
              Material
            </li>
            <li
              className={`text-center rounded-sm px-4 py-2 w-1/5 cursor-pointer ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
                selectedMenu === "Notice"
                  ? "border-b-2 pb-2 border-blue-500 bg-blue-100 rounded-sm"
                  : "bg-blue-500 text-white hover:bg-blue-600 border-b-2 border-blue-500"
              }`}
              onClick={() => setSelectedMenu("Notice")}
            >
              Notice
            </li>
          </ul>
          <>
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
          </>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
