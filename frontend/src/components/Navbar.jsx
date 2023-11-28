import React, {useState, useEffect} from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard,RxCross2, RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ setIsOpen, IsOpen }) => {
  const router = useLocation();
  const navigate = useNavigate();
  const [isScreenSizeAbove420px, setIsScreenSizeAbove420px] = useState(false);

  const handleClick = () => {
    setIsOpen();
  };
  const handleResize = () => {
    setIsScreenSizeAbove420px(window.matchMedia('(min-width: 421px)').matches);
  };
  useEffect(() => {
    // Initial check on component mount
    handleResize();

    // Add event listener for changes in viewport width
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="shadow-md px-6 py-4 flex justify-between items-center">
    <button
      className="font-semibold text-2xl flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      <span className="mr-2 hidden menu__icon">
        {IsOpen ? <RxCross2 /> : <RxHamburgerMenu />}
      </span>
      {!IsOpen && `${router.state && router.state.type} Dashboard`}
    </button>
    {IsOpen && (
      <button
        className="flex justify-center items-center text-red-500 px-3 py-2 font-semibold rounded-sm"
        onClick={() => navigate("/")}
      >
        Logout
        <span className="ml-2">
          <FiLogOut />
        </span>
      </button>
    )}
    {isScreenSizeAbove420px && (
      <button
        className="flex justify-center items-center text-red-500 px-3 py-2 font-semibold rounded-sm"
        onClick={() => navigate('/')}
      >
        Logout
        <span className="ml-2">
          <FiLogOut />
        </span>
      </button>
    )}
  </div>
);
};

export default Navbar;
