import { useState } from "react";
import logo from "../assets/images/logo_md.png";
import avatar from "../assets/images/profile.png";
import { BsShieldFillExclamation } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import UserProfile from "../component/UserProfile";
import { logoutAdmin } from "../redux/Action";
import { useDispatch } from "react-redux";

function Header({ setIsSidebarOpen, isSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    dispatch(logoutAdmin(navigate));
  }

  return (
    <div className="h-[60px] fixed left-0 right-0 top-0 flex gap-2 items-center pl-4 transition-all ease-in-out duration-300 z-[1000] border-b border-[#343f61] bg-[#1F2C52] text-white">
      <div className="flex items-center gap-1 w-[260px]">
        <img src={logo} alt="logo" />
        <h1 className="text-xl font-semibold md:block">Admin</h1>
      </div>
      <div className="flex items-center w-full justify-between">
        <div className="items-center justify-center gap-2 flex">
          <button
            className="p-2 rounded-full "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <AiOutlineMenuFold size={20} />
            ) : (
              <AiOutlineMenuUnfold size={20} />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`flex relative gap-1 p-2 transition-all duration-300 ease-in-out cursor-pointer rounded-lg `}
            onClick={toggleDropdown}
          >
            <UserProfile avatar={avatar} />
            <div
              className={`absolute top-[60px] right-0 w-[184px] bg-[#1F2C52] z-[1001] overflow-hidden transition-all duration-50 text-sm ${
                isOpen ? "max-h-[500px]" : "max-h-0 p-0"
              }`}
            >
              <ul className="flex flex-col gap-1 list-none">
                <Link to="/update_password">
                  <li className="p-2 rounded cursor-pointer flex gap-2 items-center hover:bg-[#2F3D6B]">
                    <span>
                      <BsShieldFillExclamation size={16} />
                    </span>
                    Update Password
                  </li>
                </Link>
                <button onClick={handleLogout}>
                  <li className="p-2 rounded cursor-pointer flex gap-2 items-center hover:bg-[#2F3D6B]">
                    <span>
                      <LuLogOut size={16} />
                    </span>
                    Logout
                  </li>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
