import React, { useState } from "react";
import FormField from "../component/common/FormField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EnglishConstant } from "../messages/message";
import { changeUserPassword } from "../redux/Action";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeField = (field, value) => {
    if (field === "password") {
      setPassword(value);
      setPasswordError(value === "" ? EnglishConstant.password : "");
    }
  };

  const onChangePassword = (e) => {
    e.preventDefault();

    if (password === "") {
      setPasswordError(EnglishConstant.password);
    } else {
      setPasswordError("");
      dispatch(changeUserPassword(password, navigate));
    }
  };

  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };
  return (
    <div className="flex justify-center items-center bg-[#D3D9EF] text-3xl h-[100vh] p-4">
      <div className="bg-no-repeat p-8 rounded-3xl bg-right-top bg-white w-full max-w-md">
        <h6 className="text-gray-400 text-2xl font-semibold text-center">
          UPDATE PASSWORD
        </h6>
        <form onSubmit={onChangePassword}>
          <FormField
            type="password"
            field="password"
            placeholder="Enter new password"
            value={password}
            error={passwordError}
            onChange={(e) => onChangeField("password", e.target.value)}
            onBlur={(e) => onChangeField(e.target.value)}
            onKeyPress={preventSpace}
          />
          <button
            type="submit"
            className="mx-auto bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-8 text-base rounded mt-4 transition duration-200 w-fit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
