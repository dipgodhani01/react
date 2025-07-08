import { FaKey, FaRegCircleUser, FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import openEye from "../assets/images/openeye.png";
import hiddenEye from "../assets/images/hiddeneye.png";

// Sidebar list
export const sidebardata = [
  {
    id: 0,
    path: "/",
    pageName: "Dashboard",
    img: <MdDashboard />,
    roles: ["admin", "user"],
  },

  {
    id: 1,
    path: "/users",
    pageName: "Users",
    img: <FaRegCircleUser />,
    roles: ["admin", "subadmin"],
  },
  {
    id: 2,
    path: `/settings`,
    pageName: "Settings",
    img: <IoSettings />,
    roles: ["admin", "subadmin"],
  },
];

export const adminDataSignIn = ({
  error,
  username,
  onChangeField,
  showPass,
  password,
  onShowPassword,
}) => {
  return [
    {
      id: 0,
      errorusername: error.username,
      type: "text",
      placeholder: "Username",
      value: username,
      field: "username",
      onChange: onChangeField,
      img: <FaUser />,
    },
    {
      id: 1,
      errorusername: error.password,
      type: showPass ? "text" : "password",
      placeholder: "Password",
      value: password,
      field: "password",
      onChange: onChangeField,
      img: <FaKey />,
      passwordimg: showPass ? openEye : hiddenEye,
      onShowPassword: onShowPassword,
    },
  ];
};

export const userTableHeader = [
  "#ID",
  "Name",
  "Username",
  "Email",
  "Phone Number",
  "Login Status",
  "Verified",
  "Created At",
  "Actions",
];

