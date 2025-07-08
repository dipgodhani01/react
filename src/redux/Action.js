import { toast } from "react-hot-toast";
import * as types from "./ActionType";
import { handleErrors } from "../utils/util";
import instance from "../BaseUrl/BaseUrl";

// ACTION CREATORS

const signInSuccess = (payload) => ({
  type: types.ADMIN_SIGN_IN,
  payload: { ...payload },
});
const adminSuccess = (payload) => ({ type: types.GET_ADMIN, payload });
const logoutSuccess = (payload) => ({ type: types.LOGOUT_ADMIN, payload });
const changePasswordSuccess = (payload) => ({
  type: types.CHANGE_ADMIN_PASSWORD,
  payload,
});
const allUserGetSuccess = (payload) => ({
  type: types.GET_ALL_USERS,
  payload,
});

/* 
##################################### 
  API CALLS
##################################### 
*/

// SignIn - API
export const signInAdmin = (username, password, navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.post("/admin/signin", {
        username,
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

// Get Admin Profile - API
export const getAdmin = () => {
  return async function (dispatch) {
      const result = await instance.get("/admin/get_admin");
        if (result?.data?.status && result?.status === 200) {
          dispatch(adminSuccess(result?.data?.data));
        } 
  };
};

// Logout Admin - API
export const logoutAdmin = (navigate) => {
  return async function (dispatch) {
    try {
      const result = await instance.get("/admin/logout");
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
export const changeAdminPassword = (password, navigate) => {  
  return async function (dispatch) {
    try {
      const result = await instance.put("/admin/change_password", {
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

// Get All Users - API
export const getUsers = () => {
  return async function (dispatch) {
      const result = await instance.get("/admin/all_users");      
        if (result?.data?.status && result?.status === 200) {
          dispatch(allUserGetSuccess(result?.data?.data));
        } 
  };
};