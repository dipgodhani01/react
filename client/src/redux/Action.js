import { toast } from "react-hot-toast";
import * as types from "./ActionType";
import { handleErrors } from "../utils/util";
import instance from "../BaseUrl/BaseUrl";

// ACTION CREATORS
const signUpSuccess = () => ({ type: types.SIGN_UP });
const otpVerifySuccess = () => ({ type: types.OTP_VERIFY });
const signInSuccess = (payload) => ({
  type: types.SIGN_IN,
  payload: { ...payload },
});
const getUserSuccess = (payload) => ({ type: types.GET_USER, payload });
const logoutSuccess = (payload) => ({ type: types.LOGOUT_USER, payload });
const changePasswordSuccess = (payload) => ({
  type: types.CHANGE_USER_PASSWORD,
  payload,
});

/* 
##################################### 
  API CALLS
##################################### 
*/

// SignUp - API
export const SignUpUser = (formData, navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.post("/user/register", formData);
      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(signUpSuccess());
          navigate("/verification");
          toast.success(result?.data?.message);
        } else {
          toast.error(result?.data?.message);
        }
      }
    } catch (err) {
      handleErrors(err);
    }
  };
};

// OTPverify - API
export const OtpVerify = (otp, navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.post("/user/verify_otp", {
        otp,
        type: "signup",
      });
      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(otpVerifySuccess());
          navigate("/login");
          toast.success(result?.data?.message);
        } else {
          toast.error(result?.data?.message);
        }
      }
    } catch (err) {
      handleErrors(err);
    }
  };
};

// SignIn - API
export const SignInUser = (email, password, navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.post("/user/signin", {
        email,
        password,
      });

      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(signInSuccess(result?.data?.user));
          toast.success(result?.data?.message);
          navigate("/");
        } else {
          toast.error(result?.data?.message);
        }
      }
    } catch (err) {
      handleErrors(err);
    }
  };
};

// Get User Profile - API
export const getUser = () => {
  return async function (dispatch) {
      const result = await instance.get("/user/get_profile");
      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(getUserSuccess(result?.data?.data));
        } 
      }
  };
};

// Logout - API
export const logoutUser = (navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.get("/user/logout");
      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(logoutSuccess(result?.data?.data));
          toast.success(result?.data?.message);
          navigate("/login");
        } else {
          toast.error(result?.data?.message);
        }
      }
    } catch (err) {
      handleErrors(err);
    }
  };
};

// Upadate password - API
export const changeUserPassword = (password, navigate) => {  
  return async function (dispatch) {
    try {
      const result = await instance.put("/user/update_password", {
        password,
      });

      if (result?.status === 200) {
        if (result?.data?.status) {
          dispatch(changePasswordSuccess(result?.data?.user));
          toast.success(result?.data?.message);
          navigate("/login");
        } else {
          toast.error(result?.data?.message);
        }
      }
    } catch (err) {
      handleErrors(err);
    }
  };
};
