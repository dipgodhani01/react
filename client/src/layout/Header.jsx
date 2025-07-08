import React, { useState } from "react";
import profileImg from "../assets/images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { headerList } from "../data/header";
import { FaBars } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { logoutUser } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { maskEmail } from "../helper/helper";

function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavList() {
    setOpen(!open);
  }
  function handleProfileBox() {
    setProfileOpen(!profileOpen);
  }

  function handleLogout() {
    dispatch(logoutUser(navigate));
  }

  return (
    <div className="flex items-center lg:justify-evenly justify-between shadow-lg shadow-black px-4">
      <ul className="lg:flex hidden gap-6">
        {headerList.map((list, index) => {
          return (
            <li key={index} className="hover:bg-slate-100">
              <Link
                to={list.link && list.link}
                className="flex items-center gap-1 p-4"
              >
                <img src={`${list.src}`} alt="list_img" />
                {list.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="lg:hidden block p-2 relative cursor-pointer">
        <FaBars size={22} onClick={handleNavList} />
      </div>
      <ul
        className={`lg:hidden flex flex-col absolute left-0 top-[64px] bg-white w-full overflow-hidden transition-all duration-300 ease-in-out z-[10000] ${
          open ? "max-h-[300px] pb-4 shadow-xl" : "max-h-0"
        }`}
      >
        {headerList.map((list, index) => (
          <li
            key={index}
            className="hover:bg-slate-100"
            onClick={handleNavList}
          >
            <Link
              to={list.link && list.link}
              className="flex items-center gap-1 py-2 px-4"
            >
              <img src={`${list.src}`} alt="list_img" />
              {list.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-2 relative">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleProfileBox}
        >
          <img src={`${profileImg}`} alt="profile" />
          <div>
            <p>{user?.name}</p>
            <p className="text-sm text-blue-600">{maskEmail(user?.email)}</p>
          </div>
        </div>

        <div
          className={`absolute right-0 top-[64px] bg-white overflow-hidden transition-all duration-300 ease-in-out z-[10000] shadow rounded ${
            profileOpen ? "w-[230px] h-auto" : "w-0 h-0"
          }`}
        >
          <ul className="flex flex-col">
            <li onClick={handleProfileBox}>
              <Link
                to="/profile"
                className=" flex items-center text-sm gap-1 font-medium p-3 hover:bg-[#d4d9f0] hover:text-[#36406e] border-b"
              >
                <IoPersonSharp />
                <span>My Profile</span>
              </Link>
            </li>
            <li onClick={handleProfileBox}>
              <Link
                onClick={handleLogout}
                className=" flex items-center text-sm gap-1 font-medium p-3 hover:bg-[#d4d9f0] hover:text-[#36406e]"
              >
                <IoMdLogOut size={18} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
