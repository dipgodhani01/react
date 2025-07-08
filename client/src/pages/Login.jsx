import React, { useState } from "react";
import openEye from "../assets/images/openeye.png";
import hiddenEye from "../assets/images/hiddeneye.png";
import { Link, useNavigate } from "react-router-dom";
import { EnglishConstant } from "../messages/message";
import { SignInUser } from "../redux/Action";
import { useDispatch } from "react-redux";
import FormField from "../component/common/FormField";
import { userDataSignIn } from "../data";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeField = (field, value) => {
    setError({
      ...error,
      [field]: value === "" ? EnglishConstant[field] : null,
    });
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  async function userLogin(e) {
    e.preventDefault();

    if (email === "") {
      setError({ ...error, email: EnglishConstant.Email });
    } else if (password === "") {
      setError({ ...error, password: EnglishConstant.password });
    } else {
      dispatch(SignInUser(email, password, navigate));
    }
  }
  const onShowPassword = () => {
    setShowPass(!showPass);
  };

  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };
  return (
    <div className="flex justify-center items-center bg-[#D3D9EF] text-3xl h-[100vh] p-4">
      <div className="bg-no-repeat p-8 rounded-3xl bg-right-top bg-white w-full max-w-md">
        <h6 className="text-gray-400 text-2xl font-semibold mb-6 text-center">
          Login to Your Account
        </h6>
        <form onSubmit={userLogin}>
          {userDataSignIn({
            error,
            email,
            onChangeField,
            showPass,
            password,
            onShowPassword,
            passwordimg: showPass ? openEye : hiddenEye,
          }).map((item) => (
            <FormField
              key={item.id}
              type={item.type}
              field={item.field}
              placeholder={item.placeholder}
              value={item.value}
              error={item.errorusername}
              onChange={(e) => onChangeField(item.field, e.target.value)}
              onBlur={(e) => onChangeField(item.field, e.target.value)}
              onKeyPress={item.id === 0 ? null : preventSpace}
              img={item.img}
              extraComponent={
                item.id === 1 && (
                  <img
                    role="button"
                    alt="Eye-icon-img"
                    onClick={item.onShowPassword}
                    src={item.passwordimg}
                    className="absolute top-2.5 right-3 cursor-pointer"
                  />
                )
              }
            />
          ))}
          <button
            type="submit"
            className="mx-auto bg-blue-500 hover:bg-blue-600 text-white py-1 px-8 text-base rounded mt-4 transition duration-200 w-fit"
          >
            Login
          </button>
        </form>
        <Link to={"/register"} className="text-base text-blue-800">
          Forgot Password?
        </Link>
        <p className="text-base mt-2">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-800">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
