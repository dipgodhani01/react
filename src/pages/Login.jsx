import React, { useState } from "react";
import FormField from "../component/common/FormField";
import { adminDataSignIn } from "../data/admin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInAdmin } from "../redux/Action";
import { EnglishConstant } from "../messages/message";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeField = (field, value) => {
    setError({
      ...error,
      [field]: value === "" ? EnglishConstant[field] : null,
    });
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      setError({ ...error, username: EnglishConstant.Username });
    } else if (password === "") {
      setError({ ...error, password: EnglishConstant.Password });
    } else {
      dispatch(signInAdmin(username, password, navigate));
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
        <h6 className="text-2xl font-bold text-center leading-9">RGTS ADMIN</h6>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={onLoginSubmit}
          className="pb-10 pt-6 w-full"
        >
          {adminDataSignIn({
            error,
            username,
            onChangeField,
            password,
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
            />
          ))}
          <button
            type="submit"
            className="p-1.5 rounded-sm bg-blue-600 text-white text-base w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
