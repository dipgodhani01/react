import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../redux/Action";
import { useDispatch } from "react-redux";
import {
  initialSignUpError,
  initialSignUpFormData,
  userDataRegister,
} from "../data";
import { EnglishConstant } from "../messages/message";
import openEye from "../assets/images/openeye.png";
import hiddenEye from "../assets/images/hiddeneye.png";
import FormField from "../component/common/FormField";

function Register() {
  const [formData, setFormData] = useState(initialSignUpFormData);
  const [error, setError] = useState(initialSignUpError);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError((prev) => ({
      ...prev,
      [field]: value === "" ? EnglishConstant[field] : "",
    }));
  };

  async function userRegister(e) {
    e.preventDefault();
    if (formData.name === "") {
      setError({ ...error, name: EnglishConstant.Name });
    } else if (formData.email === "") {
      setError({ ...error, email: EnglishConstant.Email });
    } else if (formData.password === "") {
      setError({ ...error, password: EnglishConstant.password });
    } else if (formData.mobile === "") {
      setError({ ...error, mobile: EnglishConstant.Mobile });
    } else if (formData.dob === "") {
      setError({ ...error, dob: EnglishConstant.Dob });
    } else if (formData.gender === "") {
      setError({ ...error, gender: EnglishConstant.Gender });
    } else {
      dispatch(SignUpUser({ ...formData, dialCode: "+91" }, navigate));
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
      <div className="bg-no-repeat py-6 px-8 rounded-3xl bg-right-top bg-white w-full max-w-md">
        <h6 className="text-gray-600 text-2xl font-semibold mb-4 text-center">
          Create New Account
        </h6>
        <form onSubmit={userRegister}>
          {userDataRegister({
            formData,
            error,
            onChangeField,
            showPass,
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
              options={item.options}
              onKeyPress={item.id === 0 ? null : preventSpace}
              img={item.img}
              extraComponent={
                item.id === 2 && (
                  <>
                    <img
                      role="button"
                      alt="Eye-icon-img"
                      onClick={item.onShowPassword}
                      src={item.passwordimg}
                      className="absolute top-2.5 right-3 cursor-pointer"
                    />
                  </>
                )
              }
            />
          ))}
          <button
            type="submit"
            className="w-fit bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-8 text-base rounded mt-5 transition duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="text-base mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
