import openeye from "../assets/images/openeye.png";
import hiddenEye from "../assets/images/hiddeneye.png";

import {
  FaBirthdayCake,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaTransgender,
  FaUser,
} from "react-icons/fa";

export const userDataSignIn = ({
  error,
  email,
  onChangeField,
  showPass,
  password,
  onShowPassword,
}) => {
  return [
    {
      id: 0,
      field: "email", 
      type: "text",
      placeholder: "Email ID",
      value: email,
      errorusername: error.email,
      onChange: onChangeField,
      img: <FaEnvelope />,
    },
    {
      id: 1,
      field: "password", 
      type: showPass ? "text" : "password",
      placeholder: "Password",
      value: password,
      errorusername: error.password,
      onChange: onChangeField,
      img: <FaLock />,
      passwordimg: showPass ? openeye : hiddenEye,
      onShowPassword: onShowPassword,
    },
  ];
};

export const userDataRegister = ({
  formData,
  error,
  onChangeField,
  showPass,
  onShowPassword,
  passwordimg,
}) => [
  {
    id: 0,
    field: "name",
    type: "text",
    placeholder: "Full Name",
    value: formData.name || "",
    onChange: onChangeField,
    errorusername: error?.name,
    img: <FaUser />,
  },
  {
    id: 1,
    field: "email",
    type: "text",
    placeholder: "Email ID",
    value: formData.email || "",
    onChange: onChangeField,
    img: <FaEnvelope />,
    errorusername: error?.email,
  },
  {
    id: 2,
    field: "password",
    type: showPass ? "text" : "password",
    placeholder: "Password",
    value: formData.password || "",
    onChange: onChangeField,
    img: <FaLock />,
    errorusername: error?.password,
    passwordimg: showPass ? openeye : hiddenEye,
    onShowPassword: onShowPassword,
  },
  {
    id: 3,
    field: "mobile",
    type: "text",
    placeholder: "Mobile Number (+91)",
    value: formData.mobile || "",
    onChange: onChangeField,
    img: <FaPhone />,
    errorusername: error?.mobile,
  },
  {
    id: 4,
    field: "dob",
    type: "date",
    placeholder: "Date of Birth",
    value: formData.dob || "",
    onChange: onChangeField,
    img: <FaBirthdayCake />,
    errorusername: error?.dob,
  },
  {
    id: 5,
    field: "gender",
    type: "select",
    placeholder: "Gender",
    value: formData.gender || "",
    onChange: onChangeField,
    img: <FaTransgender />,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    errorusername: error?.gender,
  },
];

export const initialSignUpFormData = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  dob: "",
  gender: "",
};

export const initialSignUpError = {
  name: "",
  username: "",
  email: "",
  password: "",
  mobile: "",
  dob: "",
  gender: "",
};
