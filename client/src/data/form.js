import { FaUser, FaEnvelope, FaPhone, FaKey, FaUserTag } from "react-icons/fa";
import { IoMdTransgender } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

export const registerFields = [
  {
    icon: <FaUser size={16} />,
    type: "text",
    name: "name",
    placeholder: "Name",
  },
  {
    icon: <FaUserTag size={16} />,
    type: "text",
    name: "username",
    placeholder: "Username",
  },
  {
    icon: <FaEnvelope size={16} />,
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    icon: <FaPhone size={16} />,
    type: "tel",
    name: "mobile",
    placeholder: "Phone number",
  },
  {
    icon: <FaKey size={16} />,
    type: "password",
    name: "password",
    placeholder: "Password",
  },
  {
    icon: <SlCalender size={16} />,
    type: "date",
    name: "dob",
    placeholder: "DOB",
  },
  {
    icon: <IoMdTransgender size={16} />,
    type: "select",
    name: "gender",
    placeholder: "Gender",
  },
];

export const loginFields = [
  {
    icon: <FaEnvelope size={16} />,
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    icon: <FaKey size={16} />,
    type: "password",
    name: "password",
    placeholder: "Password",
  },
];

// src/data/dialCodes.js
export const dialCodes = [
  { code: "+91", country: "India", length:10 },
  { code: "+1", country: "USA" , length:10 },
  { code: "+44", country: "UK", length:11 },
];
