import * as types from "./ActionType";

const initialstate = {
  user: null,
  allUsers: [],
};

const adminReducres = (state = initialstate, action) => {
  switch (action.type) {
    case types.ADMIN_SIGN_IN:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case types.GET_ADMIN:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGOUT_ADMIN:
      return {
        ...state,
        user: null,
      };
    case types.CHANGE_ADMIN_PASSWORD:
      return {
        ...state,
        user: action.payload,
      };
    case types.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload, // Just assign the array directly
      };

    default:
      return state;
  }
};

export default adminReducres;
