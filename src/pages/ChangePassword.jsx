import React, { useState } from "react";
import FormField from "../component/common/FormField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeAdminPassword } from "../redux/Action";
import { EnglishConstant } from "../messages/message";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeField = (field, value) => {
    if (field === "password") {
      setPassword(value);
      setPasswordError(value === "" ? EnglishConstant.Password : "");
    }
  };

  const onChangePassword = (e) => {
    e.preventDefault();

    if (password === "") {
      setPasswordError(EnglishConstant.Password);
    } else {
      setPasswordError("");
      dispatch(changeAdminPassword(password, navigate));
    }
  };

  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center text-3xl bg-[#1F2C52] h-[100vh] p-4 text-white">
      <div className="bg-no-repeat p-6 rounded-2xl bg-black/40 w-full max-w-md">
        <h6 className="text-2xl font-bold text-center leading-9">
          PASSWORD UPDATE
        </h6>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={onChangePassword}
          className="pb-10 pt-6 w-full"
        >
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
            className="p-1.5 rounded-sm bg-blue-600 text-white text-base w-full"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
